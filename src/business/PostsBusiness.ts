import { PostDatabase } from "../database/PostDataBase";
import { CreatePostInputValidator } from "../validators/post/CreatPostValidator";
import {
  DeletePostInputSchema,
  DeletePostInputValidator,
} from "../validators/post/DeletePostValidator";
import {
  EditPostInputSchema,
  EditPostInputValidator,
} from "../validators/post/EditPostValidator";
import {
  GetPostInputValidator,
  GetPostOutputValidator,
} from "../validators/post/GetPostValidator";
import { LikePostInputValidator } from "../validators/post/LikePostValidator";
import { BadRequestError } from "../errors/BadRequestError/BadRequestError";
import { Post, PostDB } from "../models/Post";
import { USER_ROLES, UserDB } from "../models/User";
import { IdGenerator } from "../models/helpers/idGenerator";
import { TokenManager } from "../models/helpers/TokenManager";
import { NotAuthorizedError } from "../errors/UnauthorizedError/NotAuthorizedError";

export class PostsBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getPostsAll = async (
    input: GetPostInputValidator
  ): Promise<GetPostOutputValidator[]> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new NotAuthorizedError("Token inválido");
    }

    const [postsDB, usersDB] = await this.postDatabase.getPosts();

    const posts = postsDB.map((postDB: any) => {
      return new Post(
        postDB.id,
        postDB.created_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at
      );
    });

    const output: GetPostOutputValidator[] = posts.map((post: any) => {
      const creator: UserDB = usersDB.find(
        (userDB: any) => userDB.id === post.getCreatorId()
      );

      return {
        id: post.getId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
        creatorId: post.getCreatorId(),
      };
    });

    return output;
  };

  public createPost = async (input: CreatePostInputValidator) => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    console.log(payload);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const id = this.idGenerator.generateId();

    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id
    );

    const newPostDB: PostDB = {
      id: newPost.getId(),
      created_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    this.postDatabase.createPost(newPostDB);
  };

  public editPost = async (input: EditPostInputValidator) => {
    const { id, token, content } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [posts] = await this.postDatabase.getPosts();

    console.log(content);

    const postDB = posts.find((post: any) => {
      return post.id === id && post.creator_id === payload.id;
    });

    if (!postDB) {
      throw new BadRequestError(
        "Não existem posts com esse id para este usuário"
      );
    }

    await this.postDatabase.editPost(id, content);
  };

  public deletePost = async (input: DeletePostInputValidator) => {
    const { id, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const [posts] = await this.postDatabase.getPosts();

    let postDB = [];

    if (payload.role === USER_ROLES.NORMAL) {
      postDB = posts.find((post: any) => {
        return post.id === id && post.creator_id === payload.id;
      });
    }

    if (payload.role === USER_ROLES.ADMIN) {
      postDB = posts.find((post: any) => {
        return post.id === id;
      });
      console.log(payload.role);
    }

    if (!postDB) {
      throw new BadRequestError("Não pudemos encontrar esse post");
    }

    await this.postDatabase.deletePost(id);
  };

  public likePost = async (input: LikePostInputValidator) => {
    const { id, like, token } = input;
    const payload = this.tokenManager.getPayload(token);
    const isLiked = await this.postDatabase.verifyLike(id, payload.id);

    if (like) {
      if (isLiked === true) {
        throw new BadRequestError("O usuário já deu like neste post");
      }
    } else {
      if (isLiked === false) {
        throw new BadRequestError("O usuário já deu dislike neste post");
      }
    }

    await this.postDatabase.likePost(id, payload.id, like);
  };
}

import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDataBase";

export class PostDatabase extends BaseDatabase {
  private static TABLE_POSTS = "posts";
  private static TABLE_USERS = "users";
  private static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public async getPosts(): Promise<any[]> {
    const [posts, users] = await Promise.all([
      BaseDatabase.connection(PostDatabase.TABLE_POSTS),
      BaseDatabase.connection(PostDatabase.TABLE_USERS),
    ]);

    return [posts, users];
  }

  public async createPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(newPost);
  }

  public async editPost(id: string, content: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .update({ content, updated_at: new Date().toISOString() })
      .where({ id });
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .delete()
      .where({ id });
  }

  public async likePost(
    postId: string,
    userId: string,
    like: boolean
  ): Promise<void> {
    const [likesDislikes] = await BaseDatabase.connection(
      PostDatabase.TABLE_LIKES_DISLIKES
    ).where({ post_id: postId, user_id: userId });

    const likesNumber = like ? 1 : 0;
    const dislikesNumber = like ? 0 : 1;

    await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
      .increment("likes", likesNumber)
      .decrement("dislikes", dislikesNumber)
      .where({ id: postId });

    if (!likesDislikes) {
      await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).insert({
        user_id: userId,
        post_id: postId,
        like: like ? 1 : 0,
      });
    } else {
      await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update({ like: like ? 1 : 0 })
        .where({ post_id: postId, user_id: userId });
    }
  }

  public async verifyLike(postId: string, userId: string): Promise<boolean> {
    const [likesDislikes] = await BaseDatabase.connection(
      PostDatabase.TABLE_LIKES_DISLIKES
    ).where({ post_id: postId, user_id: userId });

    return likesDislikes?.like === 1;
  }
}

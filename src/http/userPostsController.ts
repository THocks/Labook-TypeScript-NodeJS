import { PostsBusiness } from "../business/PostsBusiness";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError/BaseError";
import { GetPostInputValidator } from "../validators/post/GetPostValidator";
import { CreatePostSchema } from "../validators/post/CreatPostValidator";
import { EditPostInputSchema } from "../validators/post/EditPostValidator";
import { DeletePostInputSchema } from "../validators/post/DeletePostValidator";
import { LikePostInputSchema } from "../validators/post/LikePostValidator";
import { InternalServerError } from "../errors/InternalServerError/InternalServerError";

export class PostController {
  constructor(private postBusiness: PostsBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const tokenInput = req.headers.authorization as string;

      const token: GetPostInputValidator = {
        token: tokenInput,
      };

      const output = await this.postBusiness.getPostsAll(token);

      res.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        content: req.body.content,
        token: req.headers.authorization,
      });

      await this.postBusiness.createPost(input);

      res.status(200).send({ content: input.content });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        const errorResponse = new InternalServerError(error.message);
        res.status(500).send(errorResponse.message);
      }
    }
  };

  public editPost = async (req: Request, res: Response) => {
    try {
      const input = EditPostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
        content: req.body.content,
      });

      await this.postBusiness.editPost(input);

      res.status(200).send({ content: input.content });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        const errorResponse = new InternalServerError(error.message);
        res.status(500).send(errorResponse.message);
      }
    }
  };

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = DeletePostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
      });

      await this.postBusiness.deletePost(input);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        const errorResponse = new InternalServerError(error.message);
        res.status(500).send(errorResponse.message);
      }
    }
  };

  public likePost = async (req: Request, res: Response) => {
    try {
      const input = LikePostInputSchema.parse({
        id: req.params.id,
        token: req.headers.authorization,
        like: req.body.like,
      });

      await this.postBusiness.likePost(input);

      res.status(200).send();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        const errorResponse = new InternalServerError(error.message);
        res.status(500).send(errorResponse.message);
      }
    }
  };
}

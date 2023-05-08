import express from "express";
import { IdGenerator } from "../models/helpers/idGenerator";
import { TokenManager } from "../models/helpers/TokenManager";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostController } from "../http/userPostsController";
import { PostDatabase } from "../database/PostDataBase";

export const postRouter = express.Router();

const postController = new PostController(
  new PostsBusiness(
    new PostDatabase(),
    new IdGenerator(),
    new TokenManager({
      jwtKey: "mySecretKey",
      jwtExpiresIn: "10h",
    })
  )
);

postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);
postRouter.put("/:id/like", postController.likePost);

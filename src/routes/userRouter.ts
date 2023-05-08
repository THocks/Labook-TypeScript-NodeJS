import express from "express";
import { UserController } from "../http/userController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDataBase } from "../database/UserDataBase";
import { IdGenerator } from "../models/helpers/idGenerator";
import { TokenManager } from "../models/helpers/TokenManager";
import { HashManager } from "../models/helpers/HashManager";

export const userRouter = express.Router();

const userController = new UserController(
  new UserBusiness(
    new UserDataBase(),
    new IdGenerator(),
    new TokenManager({
      jwtKey: "mySecretKey",
      jwtExpiresIn: "10h",
    }),
    new HashManager()
  )
);

userRouter.get("/", userController.getUsers);
userRouter.post("/signup", userController.signUp);
userRouter.get("/login", userController.logIn);

import { UserBusiness } from "../business/UserBusiness";
import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError/BaseError";
import {
  SignUpOutputUserValidator,
  SignUpSchema,
} from "../validators/users/SignUpValidator";
import { ZodError } from "zod";
import { LogInOutputValidator } from "../validators/users/LogInValidator";
import { InternalServerError } from "../errors/InternalServerError/InternalServerError";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.getUsers();
      res.status(200).send(users);
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

  public signUp = async (req: Request, res: Response) => {
    try {
      const input = SignUpSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      const output: SignUpOutputUserValidator = await this.userBusiness.signUp(
        input
      );

      res.status(201).send(output);
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

  public logIn = async (req: Request, res: Response) => {
    try {
      const token = await this.userBusiness.logIn({
        email: req.body.email,
        password: req.body.password,
      });
      const output: LogInOutputValidator = {
        token: token,
      };
      res.status(200).send(output);
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
}

import z from "zod";

export interface GetPostInputValidator {
  token: string;
}

export interface GetPostOutputValidator {
  content: string;
}

export interface GetPostOutputDTO {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  createdId: string;
}

export const GetPostSchema = z
  .object({
    token: z.string().min(1),
  })
  .transform((data) => data as GetPostInputValidator);

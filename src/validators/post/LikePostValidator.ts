import z from "zod";

export interface LikePostInputValidator {
  id: string;
  token: string;
  like: boolean;
}

export const LikePostInputSchema = z
  .object({
    id: z
      .string({
        required_error: "id do post é obrigatório para curtí-lo",
        invalid_type_error: "id do post precisa ser string",
      })
      .min(1),
    token: z.string({
      required_error: "token é obrigatório para curtir o post",
      invalid_type_error: "token precisa ser string",
    }),
    like: z.boolean({
      required_error: "'like' é obrigatório para curtir o post",
      invalid_type_error: "'like' precisa ser boolean",
    }),
  })
  .transform((data) => data as LikePostInputValidator);

export const DislikePostInputSchema = z
  .object({
    id: z
      .string({
        required_error: "id do post é obrigatório para descurtí-lo",
        invalid_type_error: "id do post precisa ser string",
      })
      .min(1),
    token: z.string({
      required_error: "token é obrigatório para descurtir o post",
      invalid_type_error: "token precisa ser string",
    }),
    like: z.boolean().optional(),
  })
  .transform((data) => data as LikePostInputValidator);

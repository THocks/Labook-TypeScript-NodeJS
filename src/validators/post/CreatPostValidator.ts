import z from "zod";

export interface CreatePostInputValidator {
  content: string;
  token: string;
}

export interface CreatePostOutputValidator {
  content: string;
}

export const CreatePostSchema = z
  .object({
    content: z
      .string({
        required_error: "'content' é obrigatório",
        invalid_type_error: "'content' precisa ser uma string",
      })
      .min(3, "'Comentario' deve ter pelo menos 3 caractere"),
    token: z
      .string({
        required_error:
          "É necessário um token para acessar a requisição createPost",
      })
      .min(1),
  })
  .transform((data) => data as CreatePostInputValidator);

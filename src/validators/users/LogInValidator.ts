import z from "zod";

export interface LogInInputValidator {
  email: string;
  password: string;
}

export interface LogInOutputValidator {
  token: string;
}

export const LogInSchema = z.object({
  email: z
    .string({
      required_error: "É preciso email para fazer login no sistema",
      invalid_type_error: "Email precisa ser string",
    })
    .regex(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Endereço de email inválido | Exemplo 'teste@gmail.com' | "
    )
    .transform((value) => value.trim()),

  password: z
    .string({
      required_error: "É preciso uma senha para fazer login",
      invalid_type_error: "Senha precisa ser string",
    })
    .min(6, "A senha precisa ter pelo menos 6 caracteres")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/,
      "A senha precisa ter pelo menos 6 caracteres e incluir pelo menos um caractere especial, uma letra e um número"
    )
    .transform((value) => value.trim()),
});

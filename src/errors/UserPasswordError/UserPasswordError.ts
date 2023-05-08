import { BaseError } from "../BaseError/BaseError";
export class UserPasswordError extends BaseError {
  public constructor(userPassword: string) {
    super(
      "Password inexistente",
      400,
      `Senha digitada: ${userPassword} não corresponde ao usuario.`
    );
  }
}

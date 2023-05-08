import { BaseError } from "../BaseError/BaseError";
export class UserEmailError extends BaseError {
  public constructor(userEmail: string) {
    super(
      "Email inexistente ",
      400,
      `O E-mail digitado: ${userEmail} não corresponde ao usuario.`
    );
  }
}

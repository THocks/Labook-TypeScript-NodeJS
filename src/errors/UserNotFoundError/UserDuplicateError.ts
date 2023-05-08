import { BaseError } from "../BaseError/BaseError";

export class DuplicateUsernameError extends BaseError {
  public constructor(userName: string) {
    super(
      "Usuario já existente",
      409,
      ` ${userName} já existe em nosso sistema.`
    );
  }
}

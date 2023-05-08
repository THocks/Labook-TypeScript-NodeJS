import { BaseError } from "../BaseError/BaseError";

export class UserNotFoundError extends BaseError {
  public constructor(userId: string) {
    super(
      "Usuario não encontrado",
      404,
      `Usuario do ID ${userId} Não foi encontrado.`
    );
  }
}

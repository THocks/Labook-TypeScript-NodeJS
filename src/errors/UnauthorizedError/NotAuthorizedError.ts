import { BaseError } from "../BaseError/BaseError";
export class NotAuthorizedError extends BaseError {
  public constructor(message: string = "Token de acesso não e Valido") {
    super("Não autorizado", 401, message);
  }
}

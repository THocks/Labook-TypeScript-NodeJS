import { BaseError } from "../BaseError/BaseError";
export class BadRequestError extends BaseError {
  public constructor(message: string = "Solicitação Invalida") {
    super("Não autorizado", 400, message);
  }
}

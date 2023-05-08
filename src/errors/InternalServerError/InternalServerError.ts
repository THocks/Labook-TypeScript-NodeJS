import { BaseError } from "../BaseError/BaseError";

export class InternalServerError extends BaseError {
  public constructor(message: string = "Erro no Servidor") {
    super("Erro interno", 500, message);
  }
}

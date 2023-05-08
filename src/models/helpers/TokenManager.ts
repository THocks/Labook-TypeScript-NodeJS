import jwt, { Secret } from "jsonwebtoken";
import { TokenPayload } from "../User";

interface TokenManagerConfig {
  jwtKey: "mySecretKey";
  jwtExpiresIn: "10h";
}

export class TokenManager {
  private readonly config: TokenManagerConfig;

  constructor(config: TokenManagerConfig) {
    this.config = config;
  }

  public createToken(payload: TokenPayload): string {
    const token = jwt.sign(payload, this.config.jwtKey, {
      expiresIn: this.config.jwtExpiresIn,
    });
    return token;
  }

  public getPayload(token: string): TokenPayload | null {
    try {
      const payload = jwt.verify(token, this.config.jwtKey);
      return payload as TokenPayload;
    } catch (error) {
      return null;
    }
  }
}

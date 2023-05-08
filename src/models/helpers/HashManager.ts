import bcrypt from "bcryptjs";

export class HashManager {
  private readonly BCRYPT_COST = 12;

  public async hash(plaintext: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.BCRYPT_COST);
      const hash = await bcrypt.hash(plaintext, salt);
      return hash;
    } catch (err) {
      throw new Error(`Error para gerar Hash Password: ${err.message}`);
    }
  }

  public async compare(plaintext: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(plaintext, hash);
      return isMatch;
    } catch (err) {
      throw new Error(`Error comparar passwords: ${err.message}`);
    }
  }
}

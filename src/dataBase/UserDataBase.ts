import { User, UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {
  public static TABLE_USERS = "users";

  public getUsers = async () => {
    const users = await BaseDatabase.connection(UserDataBase.TABLE_USERS);
    return users;
  };

  public signUp = async (newUserDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(UserDataBase.TABLE_USERS).insert(newUserDB);
  };

  public findUSerByEmail = async (email: string): Promise<UserDB> => {
    const [userDB]: UserDB[] = await BaseDatabase.connection(
      UserDataBase.TABLE_USERS
    ).where({ email: email });

    return userDB;
  };
}

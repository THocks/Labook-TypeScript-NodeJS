import { UserDataBase } from "../database/UserDataBase";
import { LogInInputValidator } from "../validators/users/LogInValidator";
import {
  SignUpInputUserValidator,
  SignUpOutputUserValidator,
} from "../validators/users/SignUpValidator";
import { UserPasswordError } from "../errors/UserPasswordError/UserPasswordError";
import { UserEmailError } from "../errors/UserEmailError/UserEmailError";
import { USER_ROLES, User, UserDB } from "../models/User";
import { HashManager } from "../models/helpers/HashManager";
import { IdGenerator } from "../models/helpers/idGenerator";
import { TokenPayload } from "../models/User";
import { TokenManager } from "../models/helpers/TokenManager";
import { BadRequestError } from "../errors/BadRequestError/BadRequestError";
import { DuplicateUsernameError } from "../errors/UserNotFoundError/UserDuplicateError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  public getUsers = async () => {
    const usersDB = await this.userDatabase.getUsers();

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at,
        userDB.updated_at
      );

      return user.toBusinessModel();
    });
    const output = users;

    return output;
  };

  public signUp = async (
    input: SignUpInputUserValidator
  ): Promise<SignUpOutputUserValidator> => {
    const { name, email, password } = input;

    const hashPassword = await this.hashManager.hash(password);

    console.log(input);

    const id = this.idGenerator.generateId();

    const usersDB = await this.userDatabase.getUsers();

    const userEmail = usersDB.find((userDB) => userDB.email === email);
    const userName = usersDB.find((userDB) => userDB.name === name);
    if (userName) {
      throw new DuplicateUsernameError(
        "Usuário não disponivel por favor crie outro"
      );
    }

    if (userEmail) {
      throw new UserEmailError(
        "Já existe um usuário com esse email, no sistema"
      );
    }

    const newUser = new User(
      id,
      name,
      email,
      hashPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
      updated_at: newUser.getupDatedAt(),
    };

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    await this.userDatabase.signUp(newUserDB);

    return { token };
  };

  public logIn = async (input: LogInInputValidator) => {
    const { email, password } = input;

    const userDB: UserDB = await this.userDatabase.findUSerByEmail(email);

    if (!userDB) {
      throw new BadRequestError("Email não cadastrado");
    }

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      userDB.password
    );

    if (!isPasswordCorrect) {
      throw new UserPasswordError("Senha não pertece ao usuário");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at,
      userDB.updated_at
    );

    const tokenPayload: TokenPayload = {
      id: userDB.id,
      name: userDB.name,
      role: userDB.role,
    };

    const token = this.tokenManager.createToken(tokenPayload);

    return token;
  };
}

export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: string;
  updated_at: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: USER_ROLES;
  createdAt: string;
  updatedAt: string;
}

export class User {
  constructor(
    private userId: string,
    private userName: string,
    private userEmail: string,
    private userPassword: string,
    private userRole: USER_ROLES,
    private userCreatedAt: string,
    private userUpdatedAt: string
  ) {}

  public getId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getName(): string {
    return this.userName;
  }

  public setName(userName: string): void {
    this.userName = userName;
  }

  public getEmail(): string {
    return this.userEmail;
  }

  public setEmail(userEmail: string): void {
    this.userEmail = userEmail;
  }

  public getPassword(): string {
    return this.userPassword;
  }

  public setPassword(userPassword: string): void {
    this.userPassword = userPassword;
  }

  public getRole(): USER_ROLES {
    return this.userRole;
  }

  public setRole(userRole: USER_ROLES): void {
    this.userRole = userRole;
  }

  public getCreatedAt(): string {
    return this.userCreatedAt;
  }

  public setCreatedAt(userCreatedAt: string): void {
    this.userCreatedAt = userCreatedAt;
  }

  public getupDatedAt(): string {
    return this.userUpdatedAt;
  }

  public setupDatedAt(userUpdatedAt: string): void {
    this.userUpdatedAt = userUpdatedAt;
  }

  public toBusinessModel(): UserModel {
    return {
      id: this.userId,
      name: this.userName,
      email: this.userEmail,
      role: this.userRole,
      createdAt: this.userCreatedAt,
      updatedAt: this.userUpdatedAt,
    };
  }

  public toDbModel(): UserDB {
    return {
      id: this.userId,
      name: this.userName,
      email: this.userEmail,
      password: this.userPassword,
      role: this.userRole,
      created_at: this.userCreatedAt,
      updated_at: this.userUpdatedAt,
    };
  }
}

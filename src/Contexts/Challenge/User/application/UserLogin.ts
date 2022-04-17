import { Nullable } from "../../../Shared/domain/Nullable";
import { InvalidUserCredentials } from "../domain/InvalidUserCredentials";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import  bcrypt from "bcrypt";
import AuthConfig from "../../../Shared/infrastructure/AuthConfig";
import jwt from 'jsonwebtoken';

export class UserLogin {
  private repository: UserRepository;

  constructor(repository: UserRepository, private config: AuthConfig) {
    this.repository = repository;
  }

  async run(email: string, password: string): Promise<string> {
    const user = await this.repository.search(email);
    this.ensureUserExists(user, email);
    this.ensureCredentialsAreValid(user as User, password);
    return this.createToken(user as User);
  }

  private ensureUserExists(user: Nullable<User>, email: string) {
    if (user === null) {
      throw new InvalidUserCredentials(email);
    }
  }

  private async ensureCredentialsAreValid(user: User, password: string) {
    const passwordMatches: boolean = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new InvalidUserCredentials(user.email);
    }
  }

  private createToken(user: User) {
    const dataInToken = { email: user.email };
    return jwt.sign(dataInToken, this.config.secretKey, { expiresIn: this.config.expiresIn });
  }
}

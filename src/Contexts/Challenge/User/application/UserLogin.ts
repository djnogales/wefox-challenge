import { Nullable } from "../../../Shared/domain/Nullable";
import { InvalidUserCredentials } from "../domain/InvalidUserCredentials";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import  bcrypt from "bcrypt";

export class UserLogin {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(email: string, password: string): Promise<User> {
    const user = await this.repository.search(email);
    this.ensureUserExists(user, email);
    this.ensureCredentialsAreValid(user as User, password);
    return user as User;
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
}

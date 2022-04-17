import { User } from "../domain/User";
import { UserAlreadyExists } from "../domain/UserAlreadyExists";
import { UserRepository } from "../domain/UserRepository";
import bcrypt from "bcrypt";

export class UserRegister {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(email: string, password: string): Promise<void> {
    const user = new User(email, await this.encryptPassword(password));
    this.ensureUserDoesNotExist(user);

    await this.repository.save(user);
  }

  private async ensureUserDoesNotExist(user: User) {
    const userFinded = await this.repository.search(user.email);
    if (userFinded !== null) {
      throw new UserAlreadyExists(user.email);
    }
  }

  private async encryptPassword(password: string) {
    const encryptedPassword: string = await bcrypt.hash(password, 10);

    return encryptedPassword;
  }
}

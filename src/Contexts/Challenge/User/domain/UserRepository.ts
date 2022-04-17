import { Nullable } from "../../../Shared/domain/Nullable";
import { User } from "./User";

export interface UserRepository {
  search(email: string): Promise<Nullable<User>>;
  save(user: User): Promise<void>;
}

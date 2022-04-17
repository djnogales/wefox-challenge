
import { Nullable } from '../../../Shared/domain/Nullable';
import MongoConfig from '../../../Shared/infrastructure/MongoConfig';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import userModel, { UserMongo } from './MongoUserSchema';
import { connect } from "mongoose";


export class MongoUserRepository implements UserRepository {
  constructor(config: MongoConfig) {
    connect(config.url);
  }

  async save(user: User): Promise<void> {
    await userModel.create({ ...user.toPrimitives() });
  }

  async search(email: string): Promise<Nullable<User>> {
    const user: UserMongo | null = await userModel.findOne({ email: email });

    return user ? new User(user?.email, user?.password) : null;
  }

}

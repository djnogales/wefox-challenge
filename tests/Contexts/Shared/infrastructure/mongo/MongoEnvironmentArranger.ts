import { EnvironmentArranger } from "../arranger/EnvironmentArranger";
import mongoose from "mongoose";
import MongoConfig from "../../../../../src/Contexts/Shared/infrastructure/MongoConfig";

export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private config: MongoConfig) {
    super();
  }

  async arrange(): Promise<void> {
    await mongoose.connect(this.config.url);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    collections
      .map((collection) => collection.name)
      .forEach(async (collectionName) => {
        db.dropCollection(collectionName);
      });
  }

  async close(): Promise<void> {
    await mongoose.disconnect();
  }
}

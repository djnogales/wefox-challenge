import { createClient as createRedisClient } from "redis";
import { Nullable } from "../domain/Nullable";
import { RedisClient } from "./RedisClientType";
import RedisConfig from "./RedisConfig";

export class RedisClientFactory {
  private static clients: { [key: string]: RedisClient } = {};

  static async createClient(contextName: string, config: RedisConfig): Promise<RedisClient> {
    let client = RedisClientFactory.getClient(contextName);

    if (!client) {
      client = await RedisClientFactory.createAndConnectClient(config);

      RedisClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<RedisClient> {
    return RedisClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(config: RedisConfig): Promise<RedisClient> {
    const client: RedisClient = createRedisClient({
      url: config.url
    });

    await client.connect();

    return client;
  }

  private static registerClient(client: RedisClient, contextName: string): void {
    RedisClientFactory.clients[contextName] = client;
  }
}

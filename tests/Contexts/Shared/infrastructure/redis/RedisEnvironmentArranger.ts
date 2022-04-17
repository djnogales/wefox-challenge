import { EnvironmentArranger } from "../arranger/EnvironmentArranger";
import { RedisClientType as RedisClient } from 'redis';

export class RedisEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<RedisClient>) {
    super();
  }

  async arrange(): Promise<void> {
    await (await this._client).flushAll();
  }

  async close(): Promise<void> {
    await (await this._client).quit();
  }

  protected client(): Promise<RedisClient> {
    return this._client;
  }
}

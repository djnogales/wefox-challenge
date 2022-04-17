import config from './config'
import RedisConfig from "../../../Shared/infrastructure/RedisConfig";


export class RedisConfigFactory {
  static createConfig(): RedisConfig {
    return {
      url: config.get('redis.url')
    }
  }
}

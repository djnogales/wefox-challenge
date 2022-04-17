import config from './config'
import MongoConfig from "../../../Shared/infrastructure/MongoConfig";


export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    }
  }
}

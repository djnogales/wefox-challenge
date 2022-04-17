import config from './config'
import AuthConfig from "../../../Shared/infrastructure/AuthConfig";


export class AuthConfigFactory {
  static createConfig(): AuthConfig {
    return {
      secretKey: config.get('auth.secretKey'),
      expiresIn: config.get('auth.expiresIn')
    }
  }
}

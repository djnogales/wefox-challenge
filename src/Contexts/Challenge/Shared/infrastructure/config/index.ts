import convict from 'convict';

const challengeConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  redis: {
    url: {
      doc: 'The Redis connection URL',
      format: String,
      env: 'REDIS_URL',
      default: 'redis://default@localhost:6379'
    }
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://127.0.0.1:27017/dev'
    }
  },
  auth: {
    secretKey: {
      doc: 'Secret key',
      format: String,
      env: 'SECRET_KEY',
      default: 'challenge'
    },
    expiresIn: {
      doc: 'Expiration seconds for the token',
      format: Number,
      env: 'EXPIRES_IN',
      default: 36000
    }
  }

});

challengeConfig.loadFile([__dirname + '/default.json', __dirname + '/' + challengeConfig.get('env') + '.json']);

export default challengeConfig;

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
  }
});

challengeConfig.loadFile([__dirname + '/default.json', __dirname + '/' + challengeConfig.get('env') + '.json']);

export default challengeConfig;

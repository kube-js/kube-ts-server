import getStringValue from '../../../utils/helpers/config/getStringValue';

export interface ConnectionConfig {
  readonly database: string;
  readonly host: string;
  readonly password: string;
  readonly user: string;
}

export interface KnexConfig {
  readonly client: string;
  readonly connection: ConnectionConfig;
}

export interface ModelConfig {
  readonly type: string;
  readonly knex: KnexConfig;
}

const config: ModelConfig = {
  knex: {
    client: getStringValue(process.env.KNEX_CLIENT, 'mysql'),
    connection: {
      database: getStringValue(process.env.KNEX_DATABASE, 'test_db'),
      host: getStringValue(process.env.KNEX_HOST, '127.0.0.1'),
      password: getStringValue(process.env.KNEX_PASSWORD, ''),
      user: getStringValue(process.env.KNEX_USER, 'root'),
    },
  },
  type: getStringValue(process.env.MODELS_REPO_TYPE, 'knex'),
};

export default config;

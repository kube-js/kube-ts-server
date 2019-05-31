import {
  KNEX_CLIENT,
  KNEX_DATABASE,
  KNEX_HOST,
  KNEX_PASSWORD,
  KNEX_USER,
  MODELS_REPO_TYPE,
} from '../../../constants';
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
    client: getStringValue(process.env.KNEX_CLIENT, KNEX_CLIENT),
    connection: {
      database: getStringValue(process.env.KNEX_DATABASE, KNEX_DATABASE),
      host: getStringValue(process.env.KNEX_HOST, KNEX_HOST),
      password: getStringValue(process.env.KNEX_PASSWORD, KNEX_PASSWORD),
      user: getStringValue(process.env.KNEX_USER, KNEX_USER),
    },
  },
  type: getStringValue(process.env.MODELS_REPO_TYPE, MODELS_REPO_TYPE),
};

export default config;

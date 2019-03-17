import { EXPRESS_HOST, EXPRESS_PORT, JWT_EXPIRES_IN } from './constants';
import getNumberValue from './utils/helpers/getNumberValue';
import getStringValue from './utils/helpers/getStringValue';
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
export interface RepoConfig {
  readonly knex: KnexConfig;
}
export interface ExpressConfig {
  readonly port: number;
  readonly host: string;
}

export interface JwtConfig {
  readonly algoritm: string;
  readonly expiresIn: number;
  readonly secret?: string;
}
export interface Config {
  readonly express: ExpressConfig;
  readonly jwt: JwtConfig;
  readonly repo: RepoConfig;
}

const config: Config = {
  express: {
    host: getStringValue(process.env.EXPRESS_HOST, EXPRESS_HOST),
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
  },
  jwt: {
    algoritm: getStringValue(process.env.JWT_ALGORITM, 'HS256'),
    expiresIn: getNumberValue(process.env.JWT_EXPIRES_IN, JWT_EXPIRES_IN),
    secret: process.env.JWT_SECRET, // intentional - do not change as exception is thrown if not set
  },
  repo: {
    knex: {
      client: getStringValue(process.env.KNEX_CLIENT, 'mysql'),
      connection: {
        database: getStringValue(process.env.KNEX_DATABASE, 'test_db'),
        host: getStringValue(process.env.KNEX_HOST, '127.0.0.1'),
        password: getStringValue(process.env.KNEX_PASSWORD, ''),
        user: getStringValue(process.env.KNEX_USER, 'root'),
      },
    },
  },
};

export default config;

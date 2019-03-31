import connectToDb from '@js-items/knex/dist/utils/connectToDb';
import * as knex from 'knex';
import { KnexConfig } from '../../../config/subconfigs/repo/model';
import closeDbConnection from './commons/closeDbConnection';
import migrationsFactory from './migrations/factory';
import usersFactory from './users/factory';

export type Connect = () => Promise<knex>;

export interface RepoConfig {
  readonly db: Connect;
}

export default ({ client, connection }: KnexConfig) => {
  const db = connectToDb({
    client,
    connection,
  });

  return {
    closeDbConnection: closeDbConnection({ db }),
    migrations: migrationsFactory({ db }),
    users: usersFactory({ db }),
  };
};

import connectToDb from '@js-items/knex/dist/utils/connectToDb';
import * as knex from 'knex';
import { KnexConfig } from '../../../config/subconfigs/repo/model';
import migrationsFactory from './migrations/factory';
import usersFactory from './users/factory';
export interface RepoConfig {
  readonly db: () => Promise<knex>;
}

export default ({ client, connection }: KnexConfig) => {
  const db = connectToDb({
    client,
    connection,
  });

  return {
    migrations: migrationsFactory({ db }),
    users: usersFactory({ db }),
  };
};

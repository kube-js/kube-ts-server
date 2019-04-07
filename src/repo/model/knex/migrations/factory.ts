import knexMigrationsRepoFactory from '@js-migrations/knex/dist/factory';
import { RepoConfig } from '../factory';
import createResetPasswordTokensTable from './tables/createResetPasswordTokensTable';
import createUsersTable from './tables/createUsersTable';

export default ({ db }: RepoConfig) =>
  knexMigrationsRepoFactory({
    db,
    migrations: [createUsersTable({ db }),createResetPasswordTokensTable({ db })],
    tableName: 'migrations',
  });

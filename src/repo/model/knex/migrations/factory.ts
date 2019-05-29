import knexMigrationsRepoFactory from '@js-migrations/knex/dist/factory';
import { RepoConfig } from '../factory';
import createCoursesTable from './tables/createCoursesTable';
import createEnrolmentsTable from './tables/createEnrolmentsTable';
import createPermissionsTable from './tables/createPermissionsTable';
import createResetPasswordTokensTable from './tables/createResetPasswordTokensTable';
import createRolePermissionTable from './tables/createRolePermissionTable';
import createRolesTable from './tables/createRolesTable';
import createUserRoleTable from './tables/createUserRoleTable';
import createUsersTable from './tables/createUsersTable';

export default ({ db }: RepoConfig) =>
  knexMigrationsRepoFactory({
    db,
    migrations: [
      createUsersTable({ db }),
      createCoursesTable({ db }),
      createEnrolmentsTable({ db }),
      createRolesTable({ db }),
      createPermissionsTable({ db }),
      createUserRoleTable({ db }),
      createRolePermissionTable({ db }),
      createResetPasswordTokensTable({ db }),
    ],
    tableName: 'migrations',
  });

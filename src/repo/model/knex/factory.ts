import connectToDb from '@js-items/knex/dist/utils/connectToDb';
import knex from 'knex/types/knex';
import { KnexConfig } from '../../../config/subconfigs/repo/model';
import categoriesFactory from './categories/factory';
import coursesFactory from './courses/factory';
import enrolmentsFactory from './enrolments/factory';
import migrationsFactory from './migrations/factory';
import closeDbConnection from './other/closeDbConnection';
import countPermissions from './other/countPermissions';
import permissionFactory from './permissions/factory';
import resetPasswordTokens from './resetPasswordTokens/factory';
import rolePermissionFactory from './rolePermission/factory';
import rolesFactory from './roles/factory';
import sectionsFactory from './sections/factory';
import userRoleFactory from './userRole/factory';
import usersFactory from './users/factory';

export type Connect = () => Promise<knex>;

export interface RepoConfig {
  readonly db: Connect;
}

export default ({ client, connection }: KnexConfig) => {
  const db = connectToDb({
    client,
    connection: { ...connection, timezone: 'UTC' },
  });

  return {
    categories: categoriesFactory({ db }),
    closeDbConnection: closeDbConnection({ db }),
    countPermissions: countPermissions({ db }),
    courses: coursesFactory({ db }),
    enrolments: enrolmentsFactory({ db }),
    migrations: migrationsFactory({ db }),
    permissions: permissionFactory({ db }),
    resetPasswordTokens: resetPasswordTokens({ db }),
    rolePermission: rolePermissionFactory({ db }),
    roles: rolesFactory({ db }),
    sections: sectionsFactory({ db }),
    userRole: userRoleFactory({ db }),
    users: usersFactory({ db }),
  };
};

import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';
import hasPermission from './functions/hasPermission';
import assignRolePermission from './functions/roles/assignRolePermission';
import revokeRolePermission from './functions/roles/revokeRolePermission';
import assignUserRole from './functions/users/assignUserRole';
import revokeUserRole from './functions/users/revokeUserRole';

export default (config: FactoryConfig) => ({
  assignRolePermission: assignRolePermission(config),
  assignUserRole: assignUserRole(config),
  auth: authFactory(config),
  closeDbConnection: config.repo.closeDbConnection,
  hasPermission: hasPermission(config),
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  permissions: config.repo.permissions,
  resetPasswordTokens: config.repo.resetPasswordTokens,
  revokeRolePermission: revokeRolePermission(config),
  revokeUserRole: revokeUserRole(config),
  rolePermission: config.repo.rolePermission,
  roles: config.repo.roles,
  sendEmail: config.repo.sendEmail,
  userRole: config.repo.userRole,
  users: config.repo.users,
});

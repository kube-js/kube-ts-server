import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';
import hasPermission from './functions/hasPermission';

export default (config: FactoryConfig) => ({
  auth: authFactory(config),
  closeDbConnection: config.repo.closeDbConnection,
  hasPermission: hasPermission(config),
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  /* TODO: create wrapper for repo functions calls so it won't expose the repo sensitive informations i.e. password */
  permissions: config.repo.permissions,
  resetPasswordTokens: config.repo.resetPasswordTokens,
  rolePermission: config.repo.rolePermission,
  roles: config.repo.roles,
  sendEmail: config.repo.sendEmail,
  userRole: config.repo.userRole,
  users: config.repo.users,
});

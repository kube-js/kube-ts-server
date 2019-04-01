import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';

export default (config: FactoryConfig) => ({
  auth: authFactory(config),
  closeDbConnection: config.repo.closeDbConnection,
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  /* TODO: create wrapper for repo functions calls so it won't expose the repo sensitive informations i.e. password */
  resetPasswordTokens: config.repo.resetPasswordTokens,
  sendEmail: config.repo.sendEmail,
  users: config.repo.users,
});

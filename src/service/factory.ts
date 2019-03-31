import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';

export default (config: FactoryConfig) => ({
  auth: authFactory(config),
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  /* TODO: create wrapper for repo functions calls so it won't expose the user sensitive informations i.e. password */
  users: config.repo.users,
});

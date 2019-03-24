import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';

export default (config: FactoryConfig) => ({
  auth: authFactory(config),
  clearService: config.repo.clearRepo,
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  users: config.repo.users,
});

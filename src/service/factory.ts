import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';

export default (config: FactoryConfig) => ({
  auth: authFactory(config),
  users: config.repo.users,
});

import Config from '../../FactoryConfig';
import login from './login';
import register from './register';
import remindPassword from './remindPassword';

export default (config: Config) => ({
  login: login(config),
  register: register(config),
  remindPassword: remindPassword(config),
  // resetPassword: resetPassword(config),
});

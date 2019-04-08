import Config from '../../FactoryConfig';
import login from './login';
import register from './register';
import remindPassword from './remindPassword';
import resetPassword from './resetPassword';
import verifyAccount from './verifyAccount';

export default (config: Config) => ({
  login: login(config),
  register: register(config),
  remindPassword: remindPassword(config),
  resetPassword: resetPassword(config),
  verifyAccount: verifyAccount(config),
});

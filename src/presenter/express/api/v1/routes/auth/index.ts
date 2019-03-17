import { Router } from 'express';
import {
  LOGIN,
  // REGISTER,
  // REMIND_PASSWORD,
  // RESET_PASSWORD,
} from '../../../../../../constants/routes';
import Config from '../../../../presenterFactory/Config';
import login from './login';
// import register from './register';
// import remindPassword from './remindPassword';
// import resetPassword from './resetPassword';

const authFactory = (config: Config): Router => {
  const router = Router();

  router.post(LOGIN, login(config));
  // router.post(REGISTER, register(config));
  // router.post(REMIND_PASSWORD, remindPassword(config));
  // router.post(RESET_PASSWORD, resetPassword(config));

  return router;
};

export default authFactory;

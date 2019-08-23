import { Router } from 'express';
import {
  LOGIN,
  REGISTER,
  REMIND_PASSWORD,
  RESEND_VERIFY_TOKEN,
  RESET_PASSWORD,
  VERIFY_ACCOUNT,
} from '../../../../../../constants/routes';
import Config from '../../../../presenterFactory/Config';
import login from './login';
import register from './register';
import remindPassword from './remindPassword';
import resendVerifyToken from './resendVerifyToken';
import resetPassword from './resetPassword';
import verifyAccount from './verifyAccount';

const authFactory = (config: Config): Router => {
  const router = Router();

  router.post(LOGIN, login(config));
  router.post(REGISTER, register(config));
  router.post(REMIND_PASSWORD, remindPassword(config));
  router.post(RESET_PASSWORD, resetPassword(config));
  router.post(VERIFY_ACCOUNT, verifyAccount(config));
  router.post(RESEND_VERIFY_TOKEN, resendVerifyToken(config));

  return router;
};

export default authFactory;

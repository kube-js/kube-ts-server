import { Router } from 'express';
import { AUTH } from '../../../../constants/routes';
import Config from '../../presenterFactory/Config';
import authFactory from './routes/auth';

const apiV1 = (config: Config): Router => {
  /** Routes below have aready /api/v1 prefix */
  const router = Router();

  router.use(AUTH, authFactory(config));

  return router;
};

export default apiV1;

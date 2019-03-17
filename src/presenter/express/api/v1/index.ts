import { Router } from 'express';
import { AUTH } from '../../../../constants/routes';
import Options from './Options';
import authFactory from './routes/auth';

const apiV1 = ({ config }: Options): Router => {
  /** Routes below have aready /api/v1 prefix */
  const router = Router();

  router.use(AUTH, authFactory(config));

  return router;
};

export default apiV1;

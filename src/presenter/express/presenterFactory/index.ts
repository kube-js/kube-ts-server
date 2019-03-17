import { Router } from 'express';
import { API_V1 } from '../../../constants/routes';
import apiV1 from '../api/v1';
import enhancedRouter from '../enhancedRouter';
import Config from './Config';

const presenterFactory = (config: Config): Router => {
  /** TODO: allow customize middlewares in enhanced config via config options */
  const router = enhancedRouter({});

  router.use(API_V1, apiV1({ router, config }));
  
  return router;
};

export default presenterFactory;

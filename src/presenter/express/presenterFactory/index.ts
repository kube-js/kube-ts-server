import { Router } from 'express';
import { API_V1 } from '../../../constants/routes';
import checkDb from '../api/commons/checks/checkDb';
import checkVersion from '../api/commons/checks/checkVersion';
import healthCheck from '../api/commons/checks/healthCheck';
import initFinished from '../api/commons/checks/initFinished';
import apiV1 from '../api/v1';
import enhancedRouter from '../enhancedRouter';
import Config from './Config';

const presenterFactory = (config: Config): Router => {
  const { http } = config.appConfig;
  const router = enhancedRouter(http);
  
  // KUBERNETES PROBES
  // @credits: https://banzaicloud.com/blog/nodejs-in-production
  router.get(http.checks.liveness, healthCheck([checkDb(config)]));
  router.get(
    http.checks.readiness,
    healthCheck([initFinished(config), checkDb(config)])
  );

  // GIT VERSION
  router.get(http.checks.version, checkVersion(config));

  // V1 API ROUTES
  router.use(API_V1, apiV1(config));

  return router;
};

export default presenterFactory;

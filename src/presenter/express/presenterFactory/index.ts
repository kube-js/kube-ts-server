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
  const router = enhancedRouter(config.httpConfig);

  // KUBERNETES PROBES
  router.get(config.httpConfig.checks.liveness, healthCheck([checkDb(config)]));
  router.get(
    config.httpConfig.checks.readiness,
    healthCheck([initFinished(config), checkDb(config)])
  );

  // GIT VERSION
  router.get(config.httpConfig.checks.version, checkVersion(config));

  // V1 API ROUTES
  router.use(API_V1, apiV1({ router, config }));

  return router;
};

export default presenterFactory;

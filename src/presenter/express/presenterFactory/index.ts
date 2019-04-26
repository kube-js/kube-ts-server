import { Router } from 'express';
import { NOT_FOUND } from 'http-status-codes';
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
  const router = enhancedRouter({
    config: http,
    translator: config.translator,
  });

  // KUBERNETES PROBES
  // @credits: https://banzaicloud.com/blog/nodejs-in-production
  router.get(http.checks.liveness, healthCheck({ checks: [checkDb], config }));
  router.get(
    http.checks.readiness,
    healthCheck({ checks: [initFinished, checkDb], config })
  );

  // GIT VERSION
  router.get(http.checks.version, checkVersion(config));

  // V1 API ROUTES
  router.use(API_V1, apiV1(config));

  // ALL NON MATCHED ROUTES
  router.use((req, res) => {
    const translations = config.translator({ req });

    const message = translations.notFound();
    res.status(NOT_FOUND).json({
      message,
    });
  });

  return router;
};

export default presenterFactory;

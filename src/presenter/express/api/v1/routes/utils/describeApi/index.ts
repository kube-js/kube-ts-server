import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { toSnake } from 'convert-keys';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import Config from '../../../../../presenterFactory/Config';

const describeApi = (config: Config) => (req: Request, res: Response) => {
  const { liveness, readiness, version } = config.appConfig.http.checks;

  const response = {
    availableRoutes: {
      auth: {
        login: '/api/v1/auth/login',
        register: '/api/v1/auth/register',
        remindPassword: '/api/v1/auth/remind-password',
        resetPassword: '/api/v1/auth/reset-password',
        verifyAccount: '/api/v1/auth/verify-account',
      },
      checks: {
        liveness,
        readiness,
        version,
      },
      permissions: '/api/v1/permissions',
      roles: '/api/v1/roles',
      users: '/api/v1/users',
    },
    docs: 'https://kubetsserver.docs.apiary.io',
    issues: 'https://github.com/kube-js/kube-ts-server/issues',
    repo: 'https://github.com/kube-js/kube-ts-server',
  };

  sendResponse({
    req,
    res,
    responseObject: toSnake(response),
    status: OK,
  });
};

export default describeApi;

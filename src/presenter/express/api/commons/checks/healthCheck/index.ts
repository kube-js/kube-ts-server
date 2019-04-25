// @credits: https://github.com/banzaicloud/node-service-tools/blob/master/src/middleware/express/health-check.ts
import { Request, Response } from 'express';
import {
  INTERNAL_SERVER_ERROR,
  OK,
  SERVICE_UNAVAILABLE,
} from 'http-status-codes';

export type Check = () => Promise<any>;

export default (checks: Check[]) => {
  // respond with '503 Service Unavailable' once the termination signal is received
  let shuttingDown = false;
  process.once('SIGTERM', () => {
    shuttingDown = true;
  });

  return async (_req: Request, res: Response) => {
    if (shuttingDown) {
      return res.status(SERVICE_UNAVAILABLE).json({
        message: 'service is shutting down',
      });
    }

    for (const check of checks) {
      try {
        await check();
      } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
          status: 'internal server error',
        });
      }
    }

    res.status(OK).json({
      status: 'ok',
    });
  };
};

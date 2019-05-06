// @credits: https://github.com/banzaicloud/node-service-tools/blob/master/src/middleware/express/health-check.ts
import sendResponse from '@js-items/express/dist/utils/sendResponse';
import { OK } from 'http-status-codes';
import ServiceUnavailableError from '../../../../../../utils/errors/http/ServiceUnavailableError';
import Config from '../../../../presenterFactory/Config';
import catchErrors from '../../../../utils/errors/catchErrors';

export type Check = (config: Config) => Promise<any>;

export interface Options {
  readonly checks: Check[];
  readonly config: Config;
}

export default ({ checks, config }: Options) => {
  let shuttingDown = false;

  process.once('SIGTERM', () => {
    shuttingDown = true;
  });

  return catchErrors(config, async (req, res) => {
    if (shuttingDown) {
      throw new ServiceUnavailableError();
    }

    try {
      for (const check of checks) {
        await check(config);
      }

      sendResponse({
        req,
        res,
        responseObject: {
          message: 'OK',
        },
        status: OK,
      });
    } catch (error) {
      config.logger.error(`Health check error: ${JSON.stringify(error.message)}`,error);

      throw new ServiceUnavailableError();
    }
  });
};

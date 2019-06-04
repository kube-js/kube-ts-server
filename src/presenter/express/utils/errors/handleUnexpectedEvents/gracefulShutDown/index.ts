// tslint:disable:no-console
/* @credits: https://github.com/banzaicloud/node-service-tools */
import { StoppableServer } from 'stoppable';
import { processExitTimeout } from '../../../../../commander/functions/dbSeed';
import { Config } from '../index';

export interface Options {
  readonly config: Config;
  readonly reason: string;
}

const stopServer = async (server: StoppableServer) =>
  new Promise((resolve, reject) => {
    server.stop((err: any, gracefully) => {
      if (err) {
        reject(err);
      }
      resolve(gracefully);
    });
  });

const gracefulShutDown = ({ config, reason }: Options) => async () => {
  const { server, service, logger } = config;

  try {
    logger.warn(`Gracefully shutting down all resources caused by ${reason}`);

    await stopServer(server);

    await service.closeDbConnection();

    setTimeout(() => {
      process.exit(0);
    }, processExitTimeout);
  } catch (err) {
    logger.error(`Failed to close all resources ${err}`);

    setTimeout(() => {
      process.exit(1);
    }, processExitTimeout);
  }
};

export default gracefulShutDown;

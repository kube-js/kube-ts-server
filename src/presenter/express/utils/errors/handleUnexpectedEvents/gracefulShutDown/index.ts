// tslint:disable:no-console
/* @credits: https://github.com/banzaicloud/node-service-tools */
import { StoppableServer } from 'stoppable';
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
  /** TODO implement logger */
  try {
    const { server, service } = config;

    console.log(`Gracefully shutting down all resources caused by ${reason}`);
    
    await stopServer(server);
    await service.closeDbConnection();
  } catch (err) {
    console.error(err, 'failed to close all resources');
  }

  process.exit(1);
};

export default gracefulShutDown;

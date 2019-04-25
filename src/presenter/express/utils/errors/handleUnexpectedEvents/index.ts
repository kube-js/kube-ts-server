/* @credits: https://github.com/banzaicloud/node-service-tools */
import { StoppableServer } from 'stoppable';
import loggerFactory from '../../../../../logger/factory';
import serviceFactory from '../../../../../service/factory';
import gracefulShutDown from './gracefulShutDown';

export interface Config {
  readonly service: ReturnType<typeof serviceFactory>;
  readonly logger: ReturnType<typeof loggerFactory>;
  readonly server: StoppableServer;
}

const handleUnexpectedEvents = (config: Config) => {
  process.once('SIGTERM', gracefulShutDown({ config, reason: 'SIGTERM' }));
  process.once('SIGINT', gracefulShutDown({ config, reason: 'SIGINT' }));
  process.on(
    'uncaughtException',
    gracefulShutDown({ config, reason: 'uncaughtException' })
  );
  process.on(
    'unhandledRejection',
    gracefulShutDown({ config, reason: 'unhandledRejection' })
  );
};

export default handleUnexpectedEvents;

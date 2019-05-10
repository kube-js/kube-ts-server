import winston from 'winston';
import loggly from 'winston-loggly-bulk';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): any => {
  const testEnv = process.env.NODE_ENV === 'test';

  if (!testEnv && config.type === 'loggly') {
    winston.add(new loggly.Loggly(config.loggly));
  }

  // only errors during testing to allow debugging
  const consoleOptions = testEnv ? { level: 'error' } : {};
  winston.add(new winston.transports.Console(consoleOptions));

  return winston;
};

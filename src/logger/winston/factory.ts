import winston from 'winston';
import loggly from 'winston-loggly-bulk';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig): any => {
  if (config.type === 'loggly') {
    winston.add(new loggly.Loggly(config.loggly));
  }
  winston.add(new winston.transports.Console());

  return winston;
};

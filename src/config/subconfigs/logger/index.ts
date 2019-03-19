import getStringValue from '../../../utils/helpers/getStringValue';

export interface WinstonConfig {
  readonly level: string;
}

export interface LoggerConfig {
  readonly type: string;
  readonly winston: WinstonConfig;
}

const config: LoggerConfig = {
  type: getStringValue(process.env.LOGGER_TYPE, 'winston'),
  winston: {
    level:  getStringValue(process.env.WINSTON_LEVEL, 'info')
  },
};

export default config;

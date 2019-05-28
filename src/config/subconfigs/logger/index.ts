import {
  LOGGER_TYPE,
  LOGGLY_JSON,
  LOGGLY_SUBDOMAIN,
  LOGGLY_TAGS,
  LOGGLY_TOKEN,
  WINSTON_LEVEL,
  WINSTON_LOGGER_TYPE,
} from '../../../constants';
import getBooleanValue from '../../../utils/helpers/config/getBooleanValue';
import getStringValue from '../../../utils/helpers/config/getStringValue';

export interface LogglyConfig {
  readonly json: boolean;
  readonly subdomain: string;
  readonly tags: string;
  readonly token: string;
}

export interface WinstonConfig {
  readonly level: string;
  readonly type: string;
  readonly loggly: LogglyConfig;
}

export interface LoggerConfig {
  readonly type: string;
  readonly winston: WinstonConfig;
}

const config: LoggerConfig = {
  type: getStringValue(process.env.LOGGER_TYPE, LOGGER_TYPE),
  winston: {
    level: getStringValue(process.env.WINSTON_LEVEL, WINSTON_LEVEL),
    loggly: {
      json: getBooleanValue(process.env.LOGGLY_JSON, LOGGLY_JSON),
      subdomain: getStringValue(process.env.LOGGLY_SUBDOMAIN, LOGGLY_SUBDOMAIN),
      tags: getStringValue(process.env.LOGGLY_TAGS, LOGGLY_TAGS),
      token: getStringValue(process.env.LOGGLY_TOKEN, LOGGLY_TOKEN),
    },
    type: getStringValue(process.env.WINSTON_LOGGER_TYPE, WINSTON_LOGGER_TYPE),
  },
};

export default config;

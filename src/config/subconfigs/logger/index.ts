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
  type: getStringValue(process.env.LOGGER_TYPE, 'winston'),
  winston: {
    level: getStringValue(process.env.WINSTON_LEVEL, 'info'),
    loggly: {
      json: getBooleanValue(process.env.LOGGLY_JSON, true),
      subdomain: getStringValue(
        process.env.LOGGLY_SUBDOMAIN,
        'your-loggly-subdomain'
      ),
      tags: getStringValue(process.env.LOGGLY_TAGS, 'tag1,tag2'),
      token: getStringValue(process.env.LOGGLY_TOKEN, 'loggly-token'),
    },
    type: getStringValue(process.env.WINSTON_LOGGER_TYPE, 'none'),
  },
};

export default config;

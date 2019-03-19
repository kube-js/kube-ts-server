import {
  EXPRESS_HOST,
  EXPRESS_PORT,
  LIVENESS_CHECK_URL,
  READINESS_CHECK_URL,
  VERSION_CHECK_URL,
} from '../../../constants';
import getNumberValue from '../../../utils/helpers/getNumberValue';
import getStringValue from '../../../utils/helpers/getStringValue';

export interface ExpressConfig {
  readonly host: string;
  readonly port: number;
}

export interface Checks {
  readonly version: string;
  readonly liveness: string;
  readonly readiness: string;
}

export interface HttpConfig {
  readonly checks: Checks;
  readonly express: ExpressConfig;
}

const config: HttpConfig = {
  checks: {
    liveness: getStringValue(
      process.env.LIVENESS_CHECK_URL,
      LIVENESS_CHECK_URL
    ),
    readiness: getStringValue(
      process.env.READINESS_CHECK_URL,
      READINESS_CHECK_URL
    ),
    version: getStringValue(process.env.VERSION_CHECK_URL, VERSION_CHECK_URL),
  },
  express: {
    host: getStringValue(process.env.EXPRESS_HOST, EXPRESS_HOST),
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
  },
};

export default config;

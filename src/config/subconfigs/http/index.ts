// tslint:disable:no-magic-numbers
import { TOO_MANY_REQUESTS } from 'http-status-codes';
import {
  EXPRESS_HOST,
  EXPRESS_PORT,
  LIVENESS_CHECK_URL,
  READINESS_CHECK_URL,
  TOO_MANY_REQUEST_MESSAGE,
  VERSION_CHECK_URL,
} from '../../../constants';
import getBooleanValue from '../../../utils/helpers/config/getBooleanValue';
import getNumberValue from '../../../utils/helpers/config/getNumberValue';
import getStringValue from '../../../utils/helpers/config/getStringValue';

export interface BaseMiddleware {
  readonly enabled: boolean;
}

// tslint:disable-next-line:no-empty-interface
export interface CorsConfig extends BaseMiddleware {}

// tslint:disable-next-line:no-empty-interface
export interface BodyParserConfig extends BaseMiddleware {}

// tslint:disable-next-line:no-empty-interface
export interface HelmetConfig extends BaseMiddleware {}

// tslint:disable-next-line:no-empty-interface
export interface CompressionConfig extends BaseMiddleware {}

export interface RateLimiterConfig extends BaseMiddleware {
  readonly skipMethods: string; // comma separated methods such as: OPTIONS,PUT
  readonly windowMs: number;
  readonly maxNumberOfRequest: number;
  readonly message: string;
  readonly statusCode: number;
}

export interface ExpressMiddlewaresConfig {
  readonly cors: CorsConfig;
  readonly bodyParser: BodyParserConfig;
  readonly helmet: HelmetConfig;
  readonly compression: CompressionConfig;
  readonly rateLimiter: RateLimiterConfig;
}

export interface ExpressConfig {
  readonly host: string;
  readonly port: number;
  readonly middlewares: ExpressMiddlewaresConfig;
  readonly trustProxy: boolean;
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
    middlewares: {
      bodyParser: {
        enabled: getBooleanValue(process.env.EXPRESS_BODY_PARSER_ENABLED, true),
      },
      compression: {
        enabled: getBooleanValue(
          process.env.EXPRESS_COMPRESSION_ENABLED,
          false
        ),
      },
      cors: {
        enabled: getBooleanValue(process.env.EXPRESS_CORS_ENABLED, true),
      },
      helmet: {
        enabled: getBooleanValue(process.env.EXPRESS_HELMET_ENABLED, true),
      },
      rateLimiter: {
        enabled: getBooleanValue(process.env.RATE_LIMITER_ENABLED, true),
        maxNumberOfRequest: getNumberValue(
          process.env.RATE_LIMITER_MAX_NUMBER_OF_REQUEST,
          100
        ),
        message: getStringValue(
          process.env.RATE_LIMITER_MESSAGE,
          TOO_MANY_REQUEST_MESSAGE
        ),
        skipMethods: getStringValue(
          process.env.RATE_LIMITER_MESSAGE,
          'OPTIONS'
        ),
        statusCode: getNumberValue(
          process.env.RATE_LIMITER_STATUS_CODE,
          TOO_MANY_REQUESTS
        ),
        windowMs: getNumberValue(
          process.env.RATE_LIMITER_WINDOW_MS,
          15 * 60 * 1000 /* 15 minutes */
        ),
      },
    },
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
    trustProxy: getBooleanValue(process.env.TRUST_PROXY, true),
  },
};

// tslint:disable-next-line:max-file-line-count
export default config;

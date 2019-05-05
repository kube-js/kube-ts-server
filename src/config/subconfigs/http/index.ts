// tslint:disable:no-magic-numbers
import { TOO_MANY_REQUESTS } from 'http-status-codes';
import {
  CLIENT_RESET_PASSWORD_TOKEN_QUERY_PARAM_NAME,
  CLIENT_RESET_PASSWORD_URL,
  CLIENT_URL,
  CLIENT_VERIFY_EMAIL_URL,
  CLIENT_VERIFY_TOKEN_QUERY_PARAM_NAME,
  EXPRESS_HOST,
  EXPRESS_PORT,
  LIVENESS_CHECK_URL,
  READINESS_CHECK_URL,
  TOO_MANY_REQUEST_MESSAGE,
  TRUST_PROXY,
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

export interface ClientConfig {
  readonly siteUrl: string;
  readonly verifyEmailUrl: string;
  readonly verifyTokenQueryParamName: string;
  readonly resetPasswordUrl: string;
  readonly resetPasswordTokenQueryParamName: string;
}

export interface HttpConfig {
  readonly checks: Checks;
  readonly express: ExpressConfig;
  readonly client: ClientConfig;
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
  client: {
    resetPasswordTokenQueryParamName: getStringValue(
      process.env.CLIENT_RESET_PASSWORD_TOKEN_QUERY_PARAM_NAME,
      CLIENT_RESET_PASSWORD_TOKEN_QUERY_PARAM_NAME
    ),
    resetPasswordUrl: getStringValue(
      process.env.CLIENT_RESET_PASSWORD_URL,
      CLIENT_RESET_PASSWORD_URL
    ),
    siteUrl: getStringValue(process.env.CLIENT_SITE_URL, CLIENT_URL),
    verifyEmailUrl: getStringValue(
      process.env.CLIENT_VERIFY_EMAIL_URL,
      CLIENT_VERIFY_EMAIL_URL
    ),
    verifyTokenQueryParamName: getStringValue(
      process.env.CLIENT_VERIFY_TOKEN_QUERY_PARAM_NAME,
      CLIENT_VERIFY_TOKEN_QUERY_PARAM_NAME
    ),
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
          10 * 60 * 1000 /* 10 minutes */
        ),
      },
    },
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
    trustProxy: getBooleanValue(process.env.TRUST_PROXY, TRUST_PROXY),
  },
};

// tslint:disable-next-line:max-file-line-count
export default config;

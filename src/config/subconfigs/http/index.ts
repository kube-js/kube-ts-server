import {
  EXPRESS_HOST,
  EXPRESS_PORT,
  LIVENESS_CHECK_URL,
  READINESS_CHECK_URL,
  VERSION_CHECK_URL,
} from '../../../constants';
import getBooleanValue from '../../../utils/helpers/getBooleanValue';
import getNumberValue from '../../../utils/helpers/getNumberValue';
import getStringValue from '../../../utils/helpers/getStringValue';

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

export interface ExpressMiddlewaresConfig {
  readonly cors: CorsConfig;
  readonly bodyParser: BodyParserConfig;
  readonly helmet: HelmetConfig;
  readonly compression: CompressionConfig;
}

export interface ExpressConfig {
  readonly host: string;
  readonly port: number;
  readonly middlewares: ExpressMiddlewaresConfig;
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
        enabled: getBooleanValue(process.env.EXPRESS_COMPRESSION_ENABLED, false),
      },
      cors: {
        enabled: getBooleanValue(process.env.EXPRESS_CORS_ENABLED, true),
      },
      helmet: {
        enabled: getBooleanValue(process.env.EXPRESS_HELMET_ENABLED, true),
      },
    },
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
  },
};

export default config;

import {
  AUTH_BODY_FIELD_NAME,
  AUTH_HEADER_NAME,
  AUTH_QUERY_PARAM_NAME,
  AUTH_SCHEME_NAME,
  JWT_ALGORITM,
  JWT_EXPIRES_IN,
  MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS,
} from '../../../constants';
import getNumberValue from '../../../utils/helpers/config/getNumberValue';
import getStringValue from '../../../utils/helpers/config/getStringValue';

export interface JwtConfig {
  readonly algoritm: string;
  readonly expiresIn: number;
  readonly secret?: string;
  readonly authSchemeName: string;
  readonly authHeaderName: string;
  readonly authBodyFieldName: string;
  readonly authQueryParamName: string;
}

export interface AuthConfig {
  readonly jwt: JwtConfig;
  readonly maxNumberOfLoginFailedAttempts: number;
}

const config: AuthConfig = {
  jwt: {
    algoritm: getStringValue(process.env.JWT_ALGORITM, JWT_ALGORITM),
    authBodyFieldName: getStringValue(
      process.env.AUTH_BODY_FIELD_NAME,
      AUTH_BODY_FIELD_NAME
    ),
    authHeaderName: getStringValue(
      process.env.AUTH_HEADER_NAME,
      AUTH_HEADER_NAME
    ),
    authQueryParamName: getStringValue(
      process.env.AUTH_QUERY_PARAM_NAME,
      AUTH_QUERY_PARAM_NAME
    ),
    authSchemeName: getStringValue(
      process.env.AUTH_SCHEME_NAME,
      AUTH_SCHEME_NAME
    ),
    expiresIn: getNumberValue(process.env.JWT_EXPIRES_IN, JWT_EXPIRES_IN),
    secret: process.env.JWT_SECRET, // intentional - do not change as exception is thrown if not set
  },
  maxNumberOfLoginFailedAttempts: getNumberValue(
    process.env.MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS,
    MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS
  ),
};

export default config;

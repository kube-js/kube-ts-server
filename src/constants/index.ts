// HTTP
export const LIVENESS_CHECK_URL = '/health/liveness';
export const READINESS_CHECK_URL = '/health/readiness';
export const VERSION_CHECK_URL = '/version';

export const EXPRESS_PORT = 8080;
export const EXPRESS_HOST = 'http://localhost';
export const TOO_MANY_REQUEST_MESSAGE = 'Too many accounts created from this IP, please try again after an 15 minutes';

// AUTH
export const JWT_EXPIRES_IN = 86400000; // 24hrs
export const JWT_ALGORITM = 'HS256';
export const AUTH_SCHEME_NAME = 'Bearer';
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_QUERY_PARAM_NAME = 'auth_token';
export const AUTH_BODY_FIELD_NAME = 'auth_token';
export const ACCOUNT_LOCKOUT_TIME_IN_MINUTES = 10;
export const MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS = 5;

// MODEL
export const UUID_LENGTH = 36;
export const VARCHAR_LENGTH = 255;
export const TEXT_LENGTH = 65535 ;

// SUPPORTED LOCALES
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'pl'];
export const LOCALE_HEADER = 'accept-language';
export const LOCALE_QUERY_PARAM = 'lang';

// REGEXP
export const REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// minimum eight characters, at least one upper case letter, at least one lower case letter, one number and one special character:
// @credits: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
export const REGEXP_PASSWORD = /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/;

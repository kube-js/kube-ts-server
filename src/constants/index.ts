// tslint:disable:no-magic-numbers
// HTTP
export const LIVENESS_CHECK_URL = '/health/liveness';
export const READINESS_CHECK_URL = '/health/readiness';
export const VERSION_CHECK_URL = '/version';

export const TRUST_PROXY = true;
export const EXPRESS_PORT = 3000;
export const EXPRESS_HOST = 'http://localhost';
export const CLIENT_URL = 'http://localhost:9000';
export const CLIENT_VERIFY_EMAIL_URL = 'http://localhost:9000/verify'; // @note: this is client url
export const CLIENT_VERIFY_TOKEN_QUERY_PARAM_NAME = 'token';
export const CLIENT_RESET_PASSWORD_URL = 'http://localhost:9000/reset-password'; // @note: this is client url
export const CLIENT_RESET_PASSWORD_TOKEN_QUERY_PARAM_NAME = 'token';
export const AUTOCOMPLETE_QUERY_PARAM_NAME = 'q';

export const TOO_MANY_REQUEST_MESSAGE =
  'Too many accounts created from this IP, please try again after an 10 minutes';
export const RATE_LIMITER_MAX_NUMBER_OF_REQUEST = 100;

export const RATE_LIMITER_SKIP_METHODS = 'OPTIONS'; // comma separated list of http methods i.e. OPTIONS,GET
export const RATE_LIMITER_WINDOW_MS = 10 * 60 * 1000; /* 10 minutes */

// AUTH
export const JWT_EXPIRES_IN_MS = 86400000; // 24hrs
export const JWT_ALGORITM = 'HS256';
export const AUTH_SCHEME_NAME = 'Bearer';
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_QUERY_PARAM_NAME = 'auth_token';
export const AUTH_BODY_FIELD_NAME = 'auth_token';
export const ACCOUNT_LOCKOUT_TIME_IN_MINUTES = 10;
export const VERIFY_LOCKOUT_TIME_IN_MINUTES = 10;
export const MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS = 5;
export const MAX_NUMBER_OF_VERIFY_ATTEMPTS = 5;
export const DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES = 60;

// LOGGER
export const LOGGER_TYPE = 'winston';
export const WINSTON_LEVEL = 'info';
export const WINSTON_LOGGER_TYPE = 'none';
export const LOGGLY_JSON = true;
export const LOGGLY_TAGS = 'kube-ts-server,api';
export const LOGGLY_TOKEN = 'your-loggly-token';
export const LOGGLY_SUBDOMAIN = 'your-loggly-subdomain';

// MODEL
export const UUID_LENGTH = 36;
export const VARCHAR_LENGTH = 255;
export const SAFE_URL_LENGTH = 2000;
export const TEXT_LENGTH = 65535;
export const KNEX_CLIENT = 'mysql';
export const KNEX_DATABASE = 'test_db';
export const KNEX_HOST = '127.0.0.1';
export const KNEX_PASSWORD = '';
export const KNEX_USER = 'root';
export const MODELS_REPO_TYPE = 'knex';

// MAIL
export const SMTP_API_KEY = 'xxxxx';
export const SMTP_DOMAIN = 'example.com';
export const SMTP_FROM = 'noreply@example.com';
export const SMTP_HOST = 'smtp.example.com';
export const SMTP_IGNORE_TLS = false;
export const SMTP_REQUIRE_TLS = false;
export const SMTP_TEST_HOST = 'localhost';
export const SMTP_SECURE = false;
export const SMTP_PASS = 'password';
export const MAIL_PORT = 587;
export const SMTP_SERVICE = 'mailgun';
export const SMTP_TO = 'support@example.com';
export const SMTP_USER = 'user';
export const MAIL_REPO_TYPE = 'nodemailer';

// SUPPORTED LOCALES
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'pl'];
export const LOCALE_HEADER = 'accept-language';
export const LOCALE_QUERY_PARAM = 'lang';

// REGEXP
export const REGEXP_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// minimum eight characters, at least one upper case letter, at least one lower case letter, one number and one special character:
// @credits: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
export const REGEXP_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// DATETIME
export const DEFAULT_DATE_FORMATS = ['DD-MM-YYYY', 'YYYY-MM-DD'];

// note double backslashes to escape the chars used for regexp queries in mysql
export const QUERY_REGEX = `(\\?([a-z0-9$_\\.\\+!\\*\\'\\(\\),;:@&=-]|%[0-9a-f]{2})*)?`;

// @credits: https://stackoverflow.com/questions/136505/searching-for-uuids-in-text-with-regex
export const UUID_REGEX =
  '([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}){1}';

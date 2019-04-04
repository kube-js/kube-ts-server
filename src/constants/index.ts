// HTTP
export const LIVENESS_CHECK_URL = '/health/liveness';
export const READINESS_CHECK_URL = '/health/readiness';
export const VERSION_CHECK_URL = '/version';

export const TRUST_PROXY = true;
export const EXPRESS_PORT = 8080;
export const EXPRESS_HOST = 'http://localhost';
export const CLIENT_URL = 'http://localhost:9000';
export const CLIENT_VERIFY_EMAIL_URL = 'http://localhost:9000/verify';
export const CLIENT_VERIFY_TOKEN_QUERY_PARAM_NAME = 'token';
export const TOO_MANY_REQUEST_MESSAGE =
'Too many accounts created from this IP, please try again after an 15 minutes';

// AUTH
export const JWT_EXPIRES_IN_MS = 86400000; // 24hrs
export const JWT_ALGORITM = 'HS256';
export const AUTH_SCHEME_NAME = 'Bearer';
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_QUERY_PARAM_NAME = 'auth_token';
export const AUTH_BODY_FIELD_NAME = 'auth_token';
export const ACCOUNT_LOCKOUT_TIME_IN_MINUTES = 10;
export const MAX_NUMBER_OF_FAILED_LOGIN_ATTEMPTS = 5;
export const DEFAULT_RESET_PASSWORD_TIME_IN_MINUTES = 60;

// MODEL
export const UUID_LENGTH = 36;
export const VARCHAR_LENGTH = 255;
export const TEXT_LENGTH = 65535;

// MAIL
export const SMTP_API_KEY = 'xxxxx';
export const SMTP_DOMAIN = 'example.com';
export const SMTP_FROM = 'noreply@example.com';
export const SMTP_HOST = 'smtp.example.com';
export const SMTP_IGNORE_TLS = false;
export const SMTP_REQUIRE_TLS = false;
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

// HTTP
export const LIVENESS_CHECK_URL = '/health/liveness';
export const READINESS_CHECK_URL = '/health/readiness';
export const VERSION_CHECK_URL = '/version';

export const EXPRESS_PORT = 8080;
export const EXPRESS_HOST = 'http://localhost';

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

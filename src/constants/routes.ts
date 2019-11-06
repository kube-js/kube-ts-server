export const API_V1 = '/api/v1';

export const ROOT = '/';
export const AUTH = '/auth';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const RESET_PASSWORD = '/reset-password';
export const REMIND_PASSWORD = '/remind-password';
export const VERIFY_ACCOUNT = '/verify-account';
export const RESEND_VERIFY_TOKEN = '/resend-verify-token';

export const USERS = '/users';
export const ASSIGN_USER_ROLE = '/:user_id/roles';
export const REVOKE_USER_ROLE = '/:user_id/roles/:role_id';

export const ROLES = '/roles';
export const ASSIGN_ROLE_PERMISSION = '/:role_id/permissions';
export const REVOKE_ROLE_PERMISSION = '/:role_id/permissions/:permission_id';

export const PERMISSIONS = '/permissions';

export const COURSES = '/courses';
export const CATEGORIES = '/categories';
export const ENROLMENTS = '/enrolments';
export const SECTIONS = '/sections';
export const UNITS = '/units';
export const COMMENTS = '/comments';
export const DISCOVERY_ITEMS = '/discovery-items';
export const AUTOCOMPLETE = '/autocomplete';

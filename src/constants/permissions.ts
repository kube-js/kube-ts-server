import { API_V1 } from './routes';

export const PERMISSIONS_URL_REGEX = `[${API_V1}/permissions]`;

export const PERMISSIONS_GET_ITEM = 'permissions.getItem';
export const PERMISSIONS_GET_ITEMS = 'permissions.getItems';
export const PERMISSIONS_DELETE_ITEM = 'permissions.deleteItem';
export const PERMISSIONS_DELETE_ITEMS = 'permissions.deleteItems';
export const PERMISSIONS_UPDATE_ITEM = 'permissions.updateItem';
export const PERMISSIONS_REPLACE_ITEM = 'permissions.replaceItem';
export const PERMISSIONS_CREATE_ITEM = 'permissions.createItem';

export const ROLES_URL_REGEX = `[${API_V1}/roles]`;

export const ROLES_GET_ITEM = 'roles.getItem';
export const ROLES_GET_ITEMS = 'roles.getItems';
export const ROLES_DELETE_ITEM = 'roles.deleteItem';
export const ROLES_DELETE_ITEMS = 'roles.deleteItems';
export const ROLES_UPDATE_ITEM = 'roles.updateItem';
export const ROLES_REPLACE_ITEM = 'roles.replaceItem';
export const ROLES_CREATE_ITEM = 'roles.createItem';
export const ROLES_ASSIGN_PERMISSION = 'roles.assignRolePermission';
export const ROLES_REVOKE_PERMISSION = 'roles.revokeRolePermission';

export const USERS_URL_REGEX = `[${API_V1}/users]`;

export const USERS_GET_ITEM = 'users.getItem';
export const USERS_GET_ITEMS = 'users.getItems';
export const USERS_DELETE_ITEM = 'users.deleteItem';
export const USERS_DELETE_ITEMS = 'users.deleteItems';
export const USERS_UPDATE_ITEM = 'users.updateItem';
export const USERS_REPLACE_ITEM = 'users.replaceItem';
export const USERS_CREATE_ITEM = 'users.createItem';
export const USERS_ASSIGN_ROLE = 'users.assignUserRole';
export const USERS_REVOKE_ROLE = 'users.revokeUserRole';

export const rolesPermissions = [
  ROLES_GET_ITEM,
  ROLES_GET_ITEMS,
  ROLES_DELETE_ITEM,
  ROLES_DELETE_ITEMS,
  ROLES_UPDATE_ITEM,
  ROLES_REPLACE_ITEM,
  ROLES_CREATE_ITEM,
  ROLES_ASSIGN_PERMISSION,
  ROLES_REVOKE_PERMISSION,
];

export const permissionsPermissions = [
  PERMISSIONS_GET_ITEM,
  PERMISSIONS_GET_ITEMS,
  PERMISSIONS_DELETE_ITEM,
  PERMISSIONS_DELETE_ITEMS,
  PERMISSIONS_UPDATE_ITEM,
  PERMISSIONS_REPLACE_ITEM,
  PERMISSIONS_CREATE_ITEM,
];

export const COURSES_URL_REGEX = `[${API_V1}/courses]`;

export const COURSES_GET_ITEM = 'courses.getItem';
export const COURSES_GET_ITEMS = 'courses.getItems';
export const COURSES_DELETE_ITEM = 'courses.deleteItem';
export const COURSES_DELETE_ITEMS = 'courses.deleteItems';
export const COURSES_UPDATE_ITEM = 'courses.updateItem';
export const COURSES_REPLACE_ITEM = 'courses.replaceItem';
export const COURSES_CREATE_ITEM = 'courses.createItem';

export const coursesPermissions = [
  COURSES_GET_ITEM,
  COURSES_GET_ITEMS,
  COURSES_DELETE_ITEM,
  COURSES_DELETE_ITEMS,
  COURSES_UPDATE_ITEM,
  COURSES_REPLACE_ITEM,
  COURSES_CREATE_ITEM,
];

export const basicUsersPermissions = [
  USERS_GET_ITEM,
  USERS_GET_ITEMS,
  COURSES_GET_ITEM,
  COURSES_GET_ITEMS,
];

export const LEARNER_PERMISSIONS = [...basicUsersPermissions];

export const INSTRUCTOR_PERMISSIONS = [...basicUsersPermissions];

export const ADMIN_PERMISSIONS = [
  ...basicUsersPermissions,
  USERS_UPDATE_ITEM,
  USERS_REPLACE_ITEM,
  USERS_DELETE_ITEM,
  USERS_DELETE_ITEMS,
  USERS_CREATE_ITEM,
  USERS_ASSIGN_ROLE,
  USERS_REVOKE_ROLE,
  ...rolesPermissions,
  ...permissionsPermissions,
  ...coursesPermissions,
// tslint:disable-next-line:max-file-line-count
];

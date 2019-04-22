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

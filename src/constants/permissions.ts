export const USERS_GET_ITEM = 'users.getItem';
export const USERS_GET_ITEMS = 'users.getItems';
export const USERS_DELETE_ITEM = 'users.deleteItem';
export const USERS_DELETE_ITEMS = 'users.deleteItems';
export const USERS_UPDATE_ITEM = 'users.updateItem';
export const USERS_REPLACE_ITEM = 'users.replaceItem';
export const USERS_CREATE_ITEM = 'users.createItem';
export const USERS_ASSIGN_ROLE = 'users.assignUserRole';
export const USERS_REVOKE_ROLE = 'users.revokeUserRole';

export const usersPermissions = [
  USERS_GET_ITEM,
  USERS_GET_ITEMS,
  USERS_DELETE_ITEM,
  USERS_DELETE_ITEMS,
  USERS_UPDATE_ITEM,
  USERS_REPLACE_ITEM,
  USERS_CREATE_ITEM,
  USERS_ASSIGN_ROLE,
  USERS_REVOKE_ROLE,
];

export const ROLES_GET_ITEM = 'roles.getItem';
export const ROLES_GET_ITEMS = 'roles.getItems';
export const ROLES_DELETE_ITEM = 'roles.deleteItem';
export const ROLES_DELETE_ITEMS = 'roles.deleteItems';
export const ROLES_UPDATE_ITEM = 'roles.updateItem';
export const ROLES_REPLACE_ITEM = 'roles.replaceItem';
export const ROLES_CREATE_ITEM = 'roles.createItem';
export const ROLES_ASSIGN_PERMISSION = 'roles.assignRolePermission';
export const ROLES_REVOKE_PERMISSION = 'roles.revokeRolePermission';

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

export const PERMISSIONS_GET_ITEM = 'permissions.getItem';
export const PERMISSIONS_GET_ITEMS = 'permissions.getItems';
export const PERMISSIONS_DELETE_ITEM = 'permissions.deleteItem';
export const PERMISSIONS_DELETE_ITEMS = 'permissions.deleteItems';
export const PERMISSIONS_UPDATE_ITEM = 'permissions.updateItem';
export const PERMISSIONS_REPLACE_ITEM = 'permissions.replaceItem';
export const PERMISSIONS_CREATE_ITEM = 'permissions.createItem';

export const permissionsPermissions = [
  PERMISSIONS_GET_ITEM,
  PERMISSIONS_GET_ITEMS,
  PERMISSIONS_DELETE_ITEM,
  PERMISSIONS_DELETE_ITEMS,
  PERMISSIONS_UPDATE_ITEM,
  PERMISSIONS_REPLACE_ITEM,
  PERMISSIONS_CREATE_ITEM,
];

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

export const ENROLMENTS_GET_ITEM = 'enrolments.getItem';
export const ENROLMENTS_GET_ITEMS = 'enrolments.getItems';
export const ENROLMENTS_DELETE_ITEM = 'enrolments.deleteItem';
export const ENROLMENTS_DELETE_ITEMS = 'enrolments.deleteItems';
export const ENROLMENTS_UPDATE_ITEM = 'enrolments.updateItem';
export const ENROLMENTS_REPLACE_ITEM = 'enrolments.replaceItem';
export const ENROLMENTS_CREATE_ITEM = 'enrolments.createItem';

export const enrolmentsPermissions = [
  ENROLMENTS_GET_ITEM,
  ENROLMENTS_GET_ITEMS,
  ENROLMENTS_DELETE_ITEM,
  ENROLMENTS_DELETE_ITEMS,
  ENROLMENTS_UPDATE_ITEM,
  ENROLMENTS_REPLACE_ITEM,
  ENROLMENTS_CREATE_ITEM,
];

export const basicUsersPermissions = [
  ENROLMENTS_GET_ITEM,
  ENROLMENTS_GET_ITEMS,
  USERS_GET_ITEM,
  USERS_GET_ITEMS,
  COURSES_GET_ITEM,
  COURSES_GET_ITEMS,
];

export const STUDENT_PERMISSIONS = [...basicUsersPermissions];

export const INSTRUCTOR_PERMISSIONS = [...basicUsersPermissions];

export const ADMIN_PERMISSIONS = [
  ...usersPermissions,
  ...enrolmentsPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
  ...coursesPermissions,
  // tslint:disable-next-line:max-file-line-count
];

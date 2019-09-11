import { CATEGORIES_GET_ITEM, CATEGORIES_GET_ITEMS, catergoriesPermissions } from "./categories";
import { COURSES_GET_ITEM, COURSES_GET_ITEMS, coursesPermissions } from "./courses";
import { ENROLMENTS_GET_ITEM, ENROLMENTS_GET_ITEMS, enrolmentsPermissions } from "./enrolments";
import { permissionsPermissions } from "./permissions";
import { rolesPermissions } from "./roles";
import { USERS_GET_ITEM, USERS_GET_ITEMS, usersPermissions } from "./users";

export const basicUsersPermissions = [
  ENROLMENTS_GET_ITEM,
  ENROLMENTS_GET_ITEMS,
  USERS_GET_ITEM,
  USERS_GET_ITEMS,
  COURSES_GET_ITEM,
  COURSES_GET_ITEMS,
  CATEGORIES_GET_ITEM,
  CATEGORIES_GET_ITEMS,
];

export const STUDENT_PERMISSIONS = [...basicUsersPermissions];

export const INSTRUCTOR_PERMISSIONS = [...basicUsersPermissions];

export const ADMIN_PERMISSIONS = [
  ...usersPermissions,
  ...enrolmentsPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
  ...coursesPermissions,
  ...catergoriesPermissions,
  // tslint:disable-next-line:max-file-line-count
];

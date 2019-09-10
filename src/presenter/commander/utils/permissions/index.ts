
import categoriesPermissions from './items/categories';
import coursesPermissions from './items/courses';
import enrolmentsPermissions from './items/enrolments';
import permissionsPermissions from './items/permissions';
import rolesPermissions from './items/roles';
import usersPermissions from './items/users';

const permissions = [
  ...categoriesPermissions,
  ...coursesPermissions,
  ...enrolmentsPermissions,
  ...usersPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
];

export default permissions;

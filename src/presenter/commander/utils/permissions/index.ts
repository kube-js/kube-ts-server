
import coursesPermissions from './items/courses';
import permissionsPermissions from './items/permissions';
import rolesPermissions from './items/roles';
import usersPermissions from './items/users';

const permissions = [
  ...coursesPermissions,
  ...usersPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
];

export default permissions;

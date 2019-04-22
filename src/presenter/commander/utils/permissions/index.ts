import permissionsPermissions from './items/permissions';
import rolesPermissions from './items/roles';
import usersPermissions from './items/users';

const permissions = [
  ...usersPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
];

export default permissions;


import coursesPermissions from './items/courses';
import enrolmentsPermissions from './items/enrolments';
import permissionsPermissions from './items/permissions';
import rolesPermissions from './items/roles';
import usersPermissions from './items/users';

const permissions = [
  ...coursesPermissions,
  ...enrolmentsPermissions,
  ...usersPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
];

export default permissions;

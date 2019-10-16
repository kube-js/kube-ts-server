import migrationsServiceFactory from '@js-migrations/core/dist/factory';
import FactoryConfig from './FactoryConfig';
import authFactory from './functions/auth/factory';
import autocomplete from './functions/autocomplete';
import getCourseDetails from './functions/getCourseDetails';
import getDiscoveryItemsForHomepage from './functions/getDiscoveryItemsForHomepage';
import hasPermission from './functions/hasPermission';
import assignRolePermission from './functions/roles/assignRolePermission';
import revokeRolePermission from './functions/roles/revokeRolePermission';
import assignUserRole from './functions/users/assignUserRole';
import revokeUserRole from './functions/users/revokeUserRole';

export default (config: FactoryConfig) => ({
  assignRolePermission: assignRolePermission(config),
  assignUserRole: assignUserRole(config),
  auth: authFactory(config),
  autocomplete: autocomplete(config),
  categories: config.repo.categories,
  closeDbConnection: config.repo.closeDbConnection,
  courses: config.repo.courses,
  enrolments: config.repo.enrolments,
  getCourseDetails: getCourseDetails(config),
  getDiscoveryItemsForHomepage: getDiscoveryItemsForHomepage(config),
  hasPermission: hasPermission(config),
  migrations: migrationsServiceFactory({
    repo: config.repo.migrations,
  }),
  permissions: config.repo.permissions,
  resetPasswordTokens: config.repo.resetPasswordTokens,
  revokeRolePermission: revokeRolePermission(config),
  revokeUserRole: revokeUserRole(config),
  rolePermission: config.repo.rolePermission,
  roles: config.repo.roles,
  sendEmail: config.repo.sendEmail,
  userRole: config.repo.userRole,
  users: config.repo.users,
});

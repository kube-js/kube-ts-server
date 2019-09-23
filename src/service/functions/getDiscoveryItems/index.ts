import _pluck from 'ramda/src/pluck';
import Config from '../../FactoryConfig';

// tslint:disable-next-line:no-empty-interface
export interface Options {}

// tslint:disable-next-line:arrow-return-shorthand
export default (_config: Config) => async (_options: Options) => {
  // TODO: return items for homepage basing on query param
  // const { items: userRoles } = await repo.userRole.getItems({
  //   filter: {
  //     userId: user.id,
  //   },
  // });

  // if (userRoles.length === 0) {
  //   throw new ForbiddenError();
  // }

  // const rolesIds = _pluck('roleId', userRoles);

  // const { items: rolePermissions } = await repo.rolePermission.getItems({
  //   filter: {
  //     roleId: {
  //       $in: rolesIds,
  //     },
  //   },
  //   pagination: {
  //     // high number to get all permissions
  //     limit: 1000
  //   }
  // });

  // if (rolePermissions.length === 0) {
  //   throw new ForbiddenError();
  // }

  // const permissionsIds = _pluck('permissionId', rolePermissions);

  // const { count } = await repo.countPermissions({
  //   method: req.method,
  //   permissionsIds,
  //   url: req.originalUrl,
  // });

  // if (count === 0) {
  //   throw new ForbiddenError();
  // }

  return Promise.resolve({});
};

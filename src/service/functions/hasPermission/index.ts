import { Request } from 'express';
import _pluck from 'ramda/src/pluck';
import User from '../../../types/items/User';
import ForbiddenError from '../../../utils/errors/auth/ForbiddenError';
import Config from '../../FactoryConfig';

export interface Options {
  readonly user: User;
  readonly req: Request;
}

export default ({ repo }: Config) => async ({ req, user }: Options) => {
  const { items: userRoles } = await repo.userRole.getItems({
    filter: {
      userId: user.id,
    },
  });

  if (userRoles.length === 0) {
    throw new ForbiddenError();
  }

  const rolesIds = _pluck('roleId', userRoles);

  const { items: rolePermissions } = await repo.rolePermission.getItems({
    filter: {
      roleId: {
        $in: rolesIds,
      },
    },
  });

  if (rolePermissions.length === 0) {
    throw new ForbiddenError();
  }

  const permissionsIds = _pluck('permissionId', rolePermissions);

  const { count } = await repo.countPermissions({
    method: req.method,
    permissionsIds,
    url: req.url,
  });

  return Boolean(count > 0);
};

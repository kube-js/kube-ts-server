import _pluck from 'ramda/src/pluck';
import repoFactory from '../../../../../repo/factory';

export interface Options {
  readonly userId: string;
  readonly repo: ReturnType<typeof repoFactory>;
}

const getRolesForUser = async ({ repo, userId }: Options) => {
  const { items: userRoles } = await repo.userRole.getItems({
    filter: {
      userId,
    },
  });

  const rolesIds = _pluck('roleId', userRoles);

  const { items } = await repo.roles.getItems({
    filter: {
      id: {
        $in: rolesIds,
      },
    },
  });

  return items;
};

export default getRolesForUser;

import Config from '../../../FactoryConfig';

export interface Options {
  readonly permissionId: string;
  readonly roleId: string;
}

export default ({ repo }: Config) => async ({ permissionId, roleId }: Options) => {
  await repo.rolePermission.deleteItems({
    filter: {
      permissionId,
      roleId,
    },
  });
};

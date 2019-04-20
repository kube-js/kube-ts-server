import Config from '../../../FactoryConfig';

export interface Options {
  readonly userId: string;
  readonly roleId: string;
}

export default ({ repo }: Config) => async ({ userId, roleId }: Options) => {
  await repo.userRole.deleteItems({
    filter: {
      roleId,
      userId,
    },
  });
};

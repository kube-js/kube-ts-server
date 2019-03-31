import { RepoConfig } from '../../factory';

export default ({ db }: RepoConfig) => async () => {
  (await db()).destroy();
};

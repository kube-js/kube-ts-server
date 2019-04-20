import { RepoConfig } from '../../factory';

export interface Options {
  readonly url: string;
  readonly permissionsIds: string[];
  readonly method: string;
}

export default ({ db }: RepoConfig) => async ({
  url,
  method,
  permissionsIds,
}: Options) => {
  const connection = await db();

  const countQuery = connection
    .count('*')
    .where({ method })
    .whereIn('id', permissionsIds)
    .from('permissions')
    .whereRaw('? REGEXP `urlRegex`', [url]);

  const [result] = await Promise.resolve(countQuery);

  const count = result !== undefined ? result['count(*)'] : 0;

  return { count };
};

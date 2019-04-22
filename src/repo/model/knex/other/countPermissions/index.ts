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

  // @credits:
  // https://medium.com/technology-learning/how-we-solved-authentication-and-authorization-in-our-microservice-architecture-994539d1b6e6
  // https://stackoverflow.com/questions/47552940/how-can-i-store-a-regex-pattern-in-a-mysql-field-and-check-an-input-against-it
  // query string regex:
  // [?([a-z0-9$_.+!*'(),;:@&=-]|%[0-9a-f]{2})*]?
  const countQuery = connection
    .count('*')
    .from('permissions')
    .where({ method })
    .whereIn('id', permissionsIds)
    .whereRaw('? REGEXP url = 1', [url]);
    
  const [result] = await Promise.resolve(countQuery);

  const count = result !== undefined ? result['count(*)'] : 0;

  return { count };
};

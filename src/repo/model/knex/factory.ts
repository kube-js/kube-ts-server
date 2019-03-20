import connectToDb from '@js-items/knex/dist/utils/connectToDb';
import { KnexConfig } from '../../../config/subconfigs/repo/model';
import usersFactory from './users/factory';

export default ({ client, connection }: KnexConfig) => {
  const db = connectToDb({
    client,
    connection,
  });

  return {
    users: usersFactory({ db }),
  };
};

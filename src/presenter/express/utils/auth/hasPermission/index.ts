import { Request } from 'express';
import User from '../../../../../types/items/User';
import Config from '../../../presenterFactory/Config';

export interface Options {
  readonly req: Request;
  readonly user: User;
  readonly config: Config;
}

const hasPermission = async ({ req, user, config }: Options) => {
  await config.service.hasPermission({
    req,
    user,
  });
};
export default hasPermission;

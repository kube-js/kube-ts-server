import { Request } from 'express';
import _isNil from 'ramda/src/isNil';
import User from '../../../../../types/items/User';
import UnverifiedAccountError from '../../../../../utils/errors/auth/UnverifiedAccountError';
import Config from '../../../presenterFactory/Config';

export interface Options {
  readonly req: Request;
  readonly user: User;
  readonly config: Config;
  readonly checkIfUserIsVerified?: boolean;
}

const hasPermission = async ({
  req,
  user,
  config,
  checkIfUserIsVerified = true,
}: Options) => {
  if (checkIfUserIsVerified && _isNil(user.verifiedAt)) {
    throw new UnverifiedAccountError();
  }

  await config.service.hasPermission({
    req,
    user,
  });
};
export default hasPermission;

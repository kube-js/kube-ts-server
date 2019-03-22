import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { JwtConfig } from '../../../../config/subconfigs/auth';
import User from '../../../../types/items/User';
import UndefinedJWTSecretError from '../../../errors/auth/UndefinedJWTSecretError';

export interface Options {
  readonly data: Partial<User>;
  readonly config: JwtConfig;
}

export default ({ data, config }: Options): string => {
  if (config.secret === undefined) {
    throw new UndefinedJWTSecretError();
  }

  const token = jwt.sign({ data, jti: v4() }, config.secret, {
    algorithm: config.algoritm,
    expiresIn: config.expiresIn,
  });

  return `${config.authSchemeName} ${token}`;
};

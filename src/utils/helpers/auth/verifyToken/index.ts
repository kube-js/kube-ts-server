import * as jwt from 'jsonwebtoken';
import ExpiredJwtTokenError from '../../../errors/auth/ExpiredJwtTokenError';
import InvalidJwtTokenError from '../../../errors/auth/InvalidJwtTokenError';
import UndefinedJWTSecretError from '../../../errors/auth/UndefinedJWTSecretError';

interface Options {
  readonly token: string;
  readonly secret?: string | Buffer;
}

export default ({ token, secret }: Options) => {
  try {
    if (secret === undefined) {
      throw new UndefinedJWTSecretError();
    }

    return jwt.verify(token, secret);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new InvalidJwtTokenError();
    } else if (err instanceof jwt.NotBeforeError) {
      throw new InvalidJwtTokenError();
    } else if (err instanceof jwt.TokenExpiredError) {
      throw new ExpiredJwtTokenError();
    }
    throw err;
  }
};

import { Request } from 'express';
import authConfig from '../../../../../../config/subconfigs/auth';
import isString from '../../../../commons/isString/isString';
// @credits: https://github.com/themikenicholson/passport-jwt

export interface FromHeaderExtractorOptions {
  authHeaderName?: string;
}

const createFromHeaderExtractor = ({
  authHeaderName = authConfig.jwt.authHeaderName,
}: FromHeaderExtractorOptions) => (req: Request): string | null => {
  if (isString(req.headers[authHeaderName])) {
    return (req.headers as any)[authHeaderName];
  }

  return null;
};

export default createFromHeaderExtractor;

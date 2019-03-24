import { Request } from 'express';
import authConfig from '../../../../../../config/subconfigs/auth';
import isString from '../../../../commons/isString';
// @credits: https://github.com/themikenicholson/passport-jwt

export interface FromBodyFieldExtractorOptions {
  authBodyFieldName?: string;
}

const createBodyFieldExtractor = ({
  authBodyFieldName = authConfig.jwt.authBodyFieldName,
}: FromBodyFieldExtractorOptions) => (req: Request): string | null => {
  if (req.body && isString(req.body[authBodyFieldName])) {
    return req.body[authBodyFieldName];
  }

  return null;
};

export default createBodyFieldExtractor;

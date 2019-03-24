import { Request } from 'express';
import url from 'url';
import authConfig from '../../../../../../config/subconfigs/auth';
import isString from '../../../../commons/isString';
// @credits: https://github.com/themikenicholson/passport-jwt

export interface FromQueryParamExtractorOptions {
  authQueryParamName?: string;
}

const createQueryParamExtractor = ({
  authQueryParamName = authConfig.jwt.authQueryParamName,
}: FromQueryParamExtractorOptions) => (req: Request): string | null => {
  const parsedUrl = url.parse(req.url, true);

  if (isString(parsedUrl.query[authQueryParamName])) {
    return (parsedUrl.query as any)[authQueryParamName];
  }

  return null;
};

export default createQueryParamExtractor;

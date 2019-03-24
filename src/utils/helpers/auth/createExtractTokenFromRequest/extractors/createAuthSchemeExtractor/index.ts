import { Request } from 'express';
import authConfig from '../../../../../../config/subconfigs/auth';
import isString from '../../../../commons/isString';
// @credits: https://github.com/themikenicholson/passport-jwt

export interface AuthSchemeExtractorOptions {
  authHeaderName?: string;
  authSchemeName?: string;
}

export const createAuthSchemeExtractor = ({
  authSchemeName = authConfig.jwt.authSchemeName,
  authHeaderName = authConfig.jwt.authHeaderName,
}: AuthSchemeExtractorOptions) => (req: Request): string | null => {
  const authScheme: string = authSchemeName.toLowerCase();
  const header: any = req.headers[authHeaderName];

  if (isString(header)) {
    return null;
  }

  const [, matchAuthScheme, matchAuthHeader] = header.match(/(\S+)\s+(\S+)/);

  if (
    isString(matchAuthScheme) &&
    isString(matchAuthHeader) &&
    matchAuthScheme.toLowerCase() === authScheme
  ) {
    return matchAuthHeader;
  }

  return null;
};

export default createAuthSchemeExtractor;

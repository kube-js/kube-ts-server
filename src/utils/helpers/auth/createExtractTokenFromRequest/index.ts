import { Request } from 'express';
import MissingJwtTokenExtractorError from '../../../errors/auth/MissingJwtTokenExtractorError';
import createAuthSchemeExtractor from './extractors/createAuthSchemeExtractor';
import createBodyFieldExtractor from './extractors/createBodyFieldExtractor';
import createQueryParamExtractor from './extractors/createQueryParamExtractor';
// @credits: https://github.com/themikenicholson/passport-jwt

export type Extractor = (req: Request) => string | null;

export type ExtractTokenFromRequest = (options: Options) => string;

export interface Config {
  extractors: Extractor[];
}

export interface Options {
  req: Request;
}

const defaultConfig = {
  extractors: [
    createBodyFieldExtractor({}),
    createQueryParamExtractor({}),
    createAuthSchemeExtractor({}),
  ],
};

const createExtractTokenFromRequest = ({
  extractors,
}: Config = defaultConfig) => ({ req }: Options): string => {
  if (extractors.length === 0) {
    throw new MissingJwtTokenExtractorError();
  }

  const token: string | null = extractors.reduce(
    (accumulator: null | string, extractor: Extractor) => {
      const extractedValue = extractor(req);

      return extractedValue !== null ? extractedValue : accumulator;
    },
    null
  );

  if (token === null) {
    throw new MissingJwtTokenExtractorError();
  }

  return token;
};

export default createExtractTokenFromRequest;

import { Request } from 'express';
import _defaultTo from 'ramda/src/defaultTo';
import MissingJwtTokenError from '../../../errors/auth/MissingJwtTokenError';
import MissingJwtTokenExtractorError from '../../../errors/auth/MissingJwtTokenExtractorError';
import createAuthSchemeExtractor from './extractors/createAuthSchemeExtractor';
import createBodyFieldExtractor from './extractors/createBodyFieldExtractor';
import createQueryParamExtractor from './extractors/createQueryParamExtractor';
// @credits: https://github.com/themikenicholson/passport-jwt

export type Extractor = (req: Request) => string | null;

export type ExtractTokenFromRequest = (options: Options) => string;

export interface Config {
  extractors?: Extractor[];
}

export interface Options {
  req: Request;
}

const defaultExtractors = [
  createBodyFieldExtractor({}),
  createQueryParamExtractor({}),
  createAuthSchemeExtractor({}),
];

export type TokenExtractorFactory = (config: Config) => ExtractTokenFromRequest;

const createExtractTokenFromRequest: TokenExtractorFactory = ({
  extractors = defaultExtractors,
}: Config) => ({ req }: Options): string => {
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
    throw new MissingJwtTokenError();
  }

  return token;
};

export default createExtractTokenFromRequest;

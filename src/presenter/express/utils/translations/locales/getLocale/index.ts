import { Request } from 'express';
import { DefaultTranslator } from '../../../../../../config/subconfigs/translator';
import isString from '../../../../../../utils/helpers/commons/isString';
import getLocaleFromHeader from '../getLocaleFromHeader';
import getLocaleFromQueryParam from '../getLocaleFromQueryParam';

export interface Options extends DefaultTranslator {
  readonly req?: Request;
}

const getLocale = ({ defaultLocale, headerName, queryParam, req }: Options) => {
  if (req === undefined) {
    return defaultLocale;
  }

  const header = getLocaleFromHeader({ req, headerName });
  const queryParameter = getLocaleFromQueryParam({ req, queryParam });

  // queryParam takes precedence over header
  if (isString(queryParameter)) {
    return queryParameter;
  }

  if (isString(header)) {
    return header;
  }

  return defaultLocale;
};

export default getLocale;

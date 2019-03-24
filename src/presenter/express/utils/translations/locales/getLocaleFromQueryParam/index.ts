import { Request } from 'express';
import { SUPPORTED_LOCALES } from '../../../../../../constants';
import isString from '../../../../../../utils/helpers/commons/isString';

export interface Options {
  readonly req: Request;
  readonly queryParam: string;
}

const getLocaleFromQueryParam = ({ req, queryParam }: Options) => {
  const queryParameter = req.query[queryParam];
  if (!isString(queryParameter)) {
    return null;
  }

  const normalisedQueryParam = queryParameter.toLowerCase();

  return SUPPORTED_LOCALES.includes(normalisedQueryParam)
    ? normalisedQueryParam
    : null;
};
export default getLocaleFromQueryParam;

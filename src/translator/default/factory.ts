import { Request } from 'express';
import getLocale from '../../presenter/express/utils/translations/locales/getLocale';
import FactoryConfig from './FactoryConfig';
import en from './translations/en';
import pl from './translations/pl';

export interface Options {
  readonly req?: Request;
}

export default ({ defaultLocale, queryParam, headerName }: FactoryConfig) => ({
  req,
}: Options) => {
  const locale = getLocale({
    defaultLocale,
    headerName,
    queryParam,
    req,
  });

  switch (locale) {
    case 'pl':
      return pl;
    case 'en':
    default:
      return en;
  }
};

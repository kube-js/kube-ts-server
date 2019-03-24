import {
  DEFAULT_LOCALE,
  LOCALE_HEADER,
  LOCALE_QUERY_PARAM,
} from '../../../constants';
import getStringValue from '../../../utils/helpers/config/getStringValue';

// tslint:disable-next-line:no-empty-interface
export interface DefaultTranslator {
  readonly defaultLocale: string;
  readonly queryParam: string;
  readonly headerName: string;
}

export interface TranslatorConfig {
  readonly type: string;
  readonly default: DefaultTranslator;
}

const config: TranslatorConfig = {
  default: {
    defaultLocale: getStringValue(process.env.DEFAULT_LOCALE, DEFAULT_LOCALE),
    headerName: getStringValue(process.env.LOCALE_HEADER, LOCALE_HEADER),
    queryParam: getStringValue(
      process.env.LOCALE_QUERY_PARAM,
      LOCALE_QUERY_PARAM
    ),
  },
  type: getStringValue(process.env.TRANSLATOR_TYPE, 'default'),
};

export default config;

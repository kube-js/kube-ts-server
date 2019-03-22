import getStringValue from '../../../utils/helpers/config/getStringValue';

// tslint:disable-next-line:no-empty-interface
export interface DefaultTranslator {}

export interface TranslatorConfig {
  readonly type: string;
  readonly default: DefaultTranslator;
}

const config: TranslatorConfig = {
  default: {},
  type: getStringValue(process.env.TRANSLATOR_TYPE, 'default'),
};

export default config;

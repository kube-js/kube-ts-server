import { Config as GlobalConfig } from '../../../config/index';
import serviceFactory from '../../../service/factory';
import translatorFactory from '../../../translator/factory';
export default interface Config {
  readonly service: ReturnType<typeof serviceFactory>;
  readonly translator: ReturnType<typeof translatorFactory>;
  readonly globalConfig: GlobalConfig;
}

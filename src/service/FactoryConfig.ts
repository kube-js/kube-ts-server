import { Config } from '../config/index';
import loggerFactory from '../logger/factory';
import repoFactory from '../repo/factory';

export default interface FactoryConfig {
  readonly globalConfig: Config;
  readonly logger: ReturnType<typeof loggerFactory>;
  readonly repo: ReturnType<typeof repoFactory>;
}

import loggerFactory from '../logger/factory';
import repoFactory from '../repo/factory';

export default interface FactoryConfig {
  readonly logger: ReturnType<typeof loggerFactory>;
  readonly repo: ReturnType<typeof repoFactory>;
}

import { Command } from 'commander';
import loggerFactory from '../../../logger/factory';
import serviceFactory from '../../../service/factory';

export default interface FactoryConfig {
  readonly service: ReturnType<typeof serviceFactory>;
  readonly program: Command;
  readonly logger: ReturnType<typeof loggerFactory>;
}

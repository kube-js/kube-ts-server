import { Command } from 'commander';
import BaseAppConfig from '../../../types/app/BaseAppConfig';

export default interface AppConfig extends BaseAppConfig {
  readonly program: Command;
}

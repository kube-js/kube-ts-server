import MailFactoryConfig from './mail/FactoryConfig';
import ModelFactoryConfig from './model/FactoryConfig';

export default interface FactoryConfig {
  readonly model: ModelFactoryConfig;
  readonly mail: MailFactoryConfig;
}

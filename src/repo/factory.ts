import FactoryConfig from './FactoryConfig';
import mailFactory from './mail/factory';
import modelFactory from './model/factory';

export default (factoryConfig: FactoryConfig) => ({
  ...modelFactory(factoryConfig.model),
  ...mailFactory(factoryConfig.mail),
});

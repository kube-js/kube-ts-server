import FactoryConfig from './FactoryConfig';
import modelFactory from './model/factory';

export default (factoryConfig: FactoryConfig) => ({
  ...modelFactory(factoryConfig.model),
});

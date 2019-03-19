import defaultTranslator from './default/factory';
import FactoryConfig from './FactoryConfig';

export default (config: FactoryConfig) => {
  switch (config.type) {
    default:
    case 'default':
      return defaultTranslator(config.default);
  }
};

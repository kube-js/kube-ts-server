import FactoryConfig from './FactoryConfig';
import winstonFactory from './winston/factory';

export default (config: FactoryConfig) => {
  switch (config.type) {
    default:
    case 'winston':
      return winstonFactory(config.winston);
  }
};

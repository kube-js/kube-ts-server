import FactoryConfig from './FactoryConfig';
import knexFactory from './knex/factory';

export default (config: FactoryConfig) => {
  switch (config.type) {
    default:
    case 'knex':
      return knexFactory(config.knex);
  }
};

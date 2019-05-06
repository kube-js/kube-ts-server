import _pick from 'ramda/src/pick';
import Permission from '../../../../../../types/items/Permission';
import Config from '../../../../presenterFactory/Config';
import baseFactory from '../utils/baseFactory';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';

const permissionsFactory = (config: Config) => {
  const router = baseFactory<Permission>({
    config,
    factoryConfig: {
      convertDocumentIntoItem: convertDocumentIntoItem(config),
    },
    service: config.service.permissions,
  });

  return router;
};

export default permissionsFactory;

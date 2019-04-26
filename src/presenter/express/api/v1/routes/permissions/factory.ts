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

// const rolesFactory = (config: Config) =>
//   expressFactory<Permission>({
//     beforeCreateItem: beforeCreateItem(config),
//     beforeDeleteItem: beforeDeleteItem(config),
//     beforeDeleteItems: beforeDeleteItems(config),
//     beforeGetItem: beforeGetItem(config),
//     beforeGetItems: beforeGetItems(config),
//     beforeReplaceItem: beforeReplaceItem(config),
//     beforeUpdateItem: beforeUpdateItem(config),
//     convertDocumentIntoItem: convertDocumentIntoItem(config),
//     convertItemIntoDocument: convertItemIntoDocument(config),
//     createPatch: createPatch(config),
//     service: config.service.permissions,
//     /* TODO: deleteItem and deleteItems should really soft delete (deletedAt)
//      * but when have permission should hard delete (remove the record) */
//     /* TODO: getItems and getItem should only get users which are not soft deleted (deletedAt !== null) */
//     /* Consider this: https://www.pandastrike.com/posts/20161004-soft-deletes-http-api/ */
//   });

export default permissionsFactory;

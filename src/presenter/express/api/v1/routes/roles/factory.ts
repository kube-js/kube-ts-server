import expressFactory from '@js-items/express/dist/factory';
import _pick from 'ramda/src/pick';
import { ASSIGN_ROLE_PERMISSION, REVOKE_ROLE_PERMISSION } from '../../../../../../constants/routes';
import Role from '../../../../../../types/items/Role';
import Config from '../../../../presenterFactory/Config';
import beforeCreateItem from '../utils/beforeCreateItem';
import beforeDeleteItem from '../utils/beforeDeleteItem';
import beforeDeleteItems from '../utils/beforeDeleteItems';
import beforeGetItem from '../utils/beforeGetItem';
import beforeGetItems from '../utils/beforeGetItems';
import beforeReplaceItem from '../utils/beforeReplaceItem';
import beforeUpdateItem from '../utils/beforeUpdateItem';
import convertItemIntoDocument from '../utils/convertItemIntoDocument';
import createPatch from '../utils/createPatch';
import assignRolePermission from './functions/assignRolePermission';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';
import revokeRolePermission from './functions/revokeRolePermission';

const rolesFactory = (config: Config) => {
  const router = expressFactory<Role>({
    beforeCreateItem: beforeCreateItem(config),
    beforeDeleteItem: beforeDeleteItem(config),
    beforeDeleteItems: beforeDeleteItems(config),
    beforeGetItem: beforeGetItem(config),
    beforeGetItems: beforeGetItems(config),
    beforeReplaceItem: beforeReplaceItem(config),
    beforeUpdateItem: beforeUpdateItem(config),
    convertDocumentIntoItem: convertDocumentIntoItem(config),
    convertItemIntoDocument: convertItemIntoDocument(config),
    createPatch: createPatch(config),
    service: config.service.roles,
    /* TODO: deleteItem and deleteItems should really soft delete (deletedAt) 
     * but when have permission should hard delete (remove the record) */
    /* TODO: getItems and getItem should only get users which are not soft deleted (deletedAt !== null) */
    /* Consider this: https://www.pandastrike.com/posts/20161004-soft-deletes-http-api/ */
  });


  router.post(ASSIGN_ROLE_PERMISSION, assignRolePermission(config));
  router.delete(REVOKE_ROLE_PERMISSION, revokeRolePermission(config));

  return router;
}
  

export default rolesFactory;

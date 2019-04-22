import expressFactory from '@js-items/express/dist/factory';
import _pick from 'ramda/src/pick';
import { ASSIGN_USER_ROLE, REVOKE_USER_ROLE } from '../../../../../../constants/routes';
import Config from '../../../../presenterFactory/Config';
import beforeDeleteItem from '../utils/beforeDeleteItem';
import beforeDeleteItems from '../utils/beforeDeleteItems';
import beforeGetItem from '../utils/beforeGetItem';
import beforeGetItems from '../utils/beforeGetItems';
import assignUserRole from './functions/assignUserRole';
import beforeCreateItem from './functions/beforeCreateItem';
import beforeReplaceItem from './functions/beforeReplaceItem';
import beforeUpdateItem from './functions/beforeUpdateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';
import convertItemIntoDocument from './functions/convertItemIntoDocument';
import createItem from './functions/createItem';
import createPatch from './functions/createPatch';
import revokeUserRole from './functions/revokeUserRole';

const usersFactory = (config: Config) =>
  {
    const router = expressFactory({
      beforeCreateItem: beforeCreateItem(config),
      beforeDeleteItem: beforeDeleteItem(config),
      beforeDeleteItems: beforeDeleteItems(config),
      beforeGetItem: beforeGetItem(config),
      beforeGetItems: beforeGetItems(config),
      beforeReplaceItem: beforeReplaceItem(config),
      beforeUpdateItem: beforeUpdateItem(config),
      convertDocumentIntoItem: convertDocumentIntoItem(config),
      convertItemIntoDocument: convertItemIntoDocument(config),
      createItem: createItem(config),
      createPatch: createPatch(config),
      service: config.service.users,
      /* TODO: deleteItem and deleteItems should really soft delete (deletedAt) 
       * but when have permission should hard delete (remove the record) */
      /* TODO: getItems and getItem should only get users which are not soft deleted (deletedAt !== null) */
      /* Consider this: https://www.pandastrike.com/posts/20161004-soft-deletes-http-api/ */
    });

    router.post(ASSIGN_USER_ROLE, assignUserRole(config));
    router.delete(REVOKE_USER_ROLE, revokeUserRole(config));

    // TODO: abstract sending the response across all router handlers
    // TODO: change @js-items/express to pass custom response handler

    return router;
  };

export default usersFactory;

import expressFactory from '@js-items/express/dist/factory';
import _pick from 'ramda/src/pick';
import Config from '../../../../presenterFactory/Config';
import beforeCreateItem from './functions/beforeCreateItem';
import beforeDeleteItem from './functions/beforeDeleteItem';
import beforeDeleteItems from './functions/beforeDeleteItems';
import beforeGetItem from './functions/beforeGetItem';
import beforeGetItems from './functions/beforeGetItems';
import beforeReplaceItem from './functions/beforeReplaceItem';
import beforeUpdateItem from './functions/beforeUpdateItem';
import convertDocumentIntoItem from './functions/convertDocumentIntoItem';
import convertItemIntoDocument from './functions/convertItemIntoDocument';
import createItem from './functions/createItem';
import createPatch from './functions/createPatch';

const usersFactory = (config: Config) =>
  expressFactory({
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

export default usersFactory;

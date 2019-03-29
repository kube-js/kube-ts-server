import knexFactory from '@js-items/knex/dist/factory';
import User from '../../../../types/items/User';
import userDocumentToItem from '../../../../utils/converters/users/documentToItem';
import userItemToDocument from '../../../../utils/converters/users/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<User>({
    convertDocumentIntoItem: userDocumentToItem,
    convertItemIntoDocument: userItemToDocument,
    db: config.db,
    itemName: 'User',
    tableName: 'users',
  });

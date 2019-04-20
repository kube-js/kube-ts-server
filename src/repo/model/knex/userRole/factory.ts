import knexFactory from '@js-items/knex/dist/factory';
import UserRole from '../../../../types/items/UserRole';
import baseDocumentToItem from '../../../../utils/converters/baseConverter/documentToItem';
import baseItemToDocument from '../../../../utils/converters/baseConverter/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<UserRole>({
    convertDocumentIntoItem: baseDocumentToItem,
    convertItemIntoDocument: baseItemToDocument,
    db: config.db,
    itemName: 'UserRole',
    tableName: 'user_role',
  });

import knexFactory from '@js-items/knex/dist/factory';
import RolePermission from '../../../../types/items/RolePermission';
import baseDocumentToItem from '../../../../utils/converters/baseConverter/documentToItem';
import baseItemToDocument from '../../../../utils/converters/baseConverter/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<RolePermission>({
    convertDocumentIntoItem: baseDocumentToItem,
    convertItemIntoDocument: baseItemToDocument,
    db: config.db,
    itemName: 'RolePermission',
    tableName: 'role_permission',
  });

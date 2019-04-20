import knexFactory from '@js-items/knex/dist/factory';
import Role from '../../../../types/items/Role';
import baseDocumentToItem from '../../../../utils/converters/baseConverter/documentToItem';
import baseItemToDocument from '../../../../utils/converters/baseConverter/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<Role>({
    convertDocumentIntoItem: baseDocumentToItem,
    convertItemIntoDocument: baseItemToDocument,
    db: config.db,
    itemName: 'Role',
    tableName: 'roles',
  });

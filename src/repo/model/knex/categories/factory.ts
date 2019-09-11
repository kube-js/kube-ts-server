import knexFactory from '@js-items/knex/dist/factory';
import Category from '../../../../types/items/Category';
import baseDocumentToItem from '../../../../utils/converters/baseConverter/documentToItem';
import baseItemToDocument from '../../../../utils/converters/baseConverter/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<Category>({
    convertDocumentIntoItem: baseDocumentToItem,
    convertItemIntoDocument: baseItemToDocument,
    db: config.db,
    itemName: 'Category',
    tableName: 'categories',
  });

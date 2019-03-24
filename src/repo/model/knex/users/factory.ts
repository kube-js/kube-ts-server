import { Document } from '@js-items/knex/dist/FacadeConfig';
import knexFactory from '@js-items/knex/dist/factory';
import User from '../../../../types/items/User';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<User>({
    constructFilter: filter => filter,
    convertDocumentIntoItem: (document: Document) => document,
    convertItemIntoDocument: (item: Partial<User>) => item,
    db: config.db,
    itemName: 'User',
    tableName: 'users',
  });

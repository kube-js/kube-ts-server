import { Document } from '@js-items/knex/dist/FacadeConfig';
import knexFactory from '@js-items/knex/dist/factory';
import * as knex from 'knex';
import User from '../../../../types/items/User';

export interface Config {
  readonly db: () => Promise<knex>;
}

export default (config: Config) =>
  knexFactory<User>({
    constructFilter: filter => filter,
    convertDocumentIntoItem: (document: Document) => document,
    convertItemIntoDocument: (item: Partial<User>) => item,
    db: config.db,
    itemName: 'User',
    tableName: 'users',
  });

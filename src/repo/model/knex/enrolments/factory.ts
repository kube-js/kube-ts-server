import knexFactory from '@js-items/knex/dist/factory';
import Enrolment from '../../../../types/items/Enrolment';
import baseDocumentToItem from '../../../../utils/converters/baseConverter/documentToItem';
import baseItemToDocument from '../../../../utils/converters/baseConverter/itemToDocument';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<Enrolment>({
    convertDocumentIntoItem: baseDocumentToItem,
    convertItemIntoDocument: baseItemToDocument,
    db: config.db,
    itemName: 'Enrolment',
    tableName: 'enrolments',
  });

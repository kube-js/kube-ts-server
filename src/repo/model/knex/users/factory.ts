import { Document } from '@js-items/knex/dist/FacadeConfig';
import knexFactory from '@js-items/knex/dist/factory';
import User from '../../../../types/items/User';
import baseConverter from '../../../../utils/converters/basicConverter';
import basicToDocumentConverter, {
  toDate,
} from '../../../../utils/converters/basicToDocumentConverter';
import { RepoConfig } from '../factory';

export default (config: RepoConfig) =>
  knexFactory<User>({
    convertDocumentIntoItem: (document: Document) => {
      const verifiedAtDocument = baseConverter({
        converter: value => (value === null ? undefined : value),
        item: document,
        propertyName: 'verifiedAt',
        useConverter: true,
      });

      return verifiedAtDocument;
    },
    convertItemIntoDocument: item => {
      const convertedVerifiedAt = basicToDocumentConverter({
        converter: toDate,
        item,
        propertyName: 'verifiedAt',
        useConverter: true,
      });

      const convertedDateOfBirth = baseConverter({
        converter: toDate,
        item: convertedVerifiedAt,
        propertyName: 'dateOfBirth',
        useConverter: true,
      });

      const convertedDeletedAt = baseConverter({
        converter: toDate,
        item: convertedDateOfBirth,
        propertyName: 'deletedAt',
        useConverter: true,
      });

      return convertedDeletedAt;
    },
    db: config.db,
    itemName: 'User',
    tableName: 'users',
  });

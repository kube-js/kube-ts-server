import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import itemToDocumentDateTime from '../helpers/itemToDocumentDateTime';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  accountLockoutExpiresAt: itemToDocumentDateTime,
  authLastAttempt: itemToDocumentDateTime,
  dateOfBirth: itemToDocumentDateTime,
  deletedAt: itemToDocumentDateTime,
  loginLastAttemptAt: itemToDocumentDateTime,
  verifiedAt: itemToDocumentDateTime,
};

const documentToItem = (document: Document) =>
  recursiveConverter({ obj: document, convertersMap });

export default documentToItem;

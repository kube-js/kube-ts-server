import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import itemToDocumentDateTime from '../helpers/itemToDocumentDateTime';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  dateOfBirth: itemToDocumentDateTime,
  deletedAt: itemToDocumentDateTime,
  loginLastAttemptAt: itemToDocumentDateTime,
  loginLockoutExpiresAt: itemToDocumentDateTime,
  verifiedAt: itemToDocumentDateTime,
  verifyLastAttemptAt: itemToDocumentDateTime,
  verifyLockoutExpiresAt: itemToDocumentDateTime,
};

const itemToDocument = (document: Document) =>
  recursiveConverter({ obj: document, convertersMap });

export default itemToDocument;

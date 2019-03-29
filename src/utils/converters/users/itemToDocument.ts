import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import itemToDocumentDate from '../helpers/itemToDocumentDate';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  accountLockoutExpiresAt: itemToDocumentDate,
  deletedAt: itemToDocumentDate,
  loginLastAttemptAt: itemToDocumentDate,
  verifiedAt: itemToDocumentDate,
};

const documentToItem = (document: Document) =>  recursiveConverter({ obj: document, convertersMap });
  
export default documentToItem;

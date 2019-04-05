import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import itemToDocumentDateTime from '../helpers/itemToDocumentDateTime';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  expiresAt: itemToDocumentDateTime,
};

const documentToItem = (document: Document) =>
  recursiveConverter({ obj: document, convertersMap });

export default documentToItem;

import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import itemToDocumentBoolean from '../helpers/itemToDocumentBoolean';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  isPublished: itemToDocumentBoolean
};

const documentToItem = (document: Document) =>
  recursiveConverter({ obj: document, convertersMap });

export default documentToItem;

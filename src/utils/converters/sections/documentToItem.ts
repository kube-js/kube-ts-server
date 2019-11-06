import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import documentToItemBoolean from '../helpers/documentToItemBoolean';
import documentToItemNumber from '../helpers/documentToItemNumber';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  isPublished: documentToItemBoolean,
  order: documentToItemNumber,
};

const documentToItem = <I>(document: Document): I =>
  recursiveConverter({ obj: document, convertersMap }) as I;

export default documentToItem;

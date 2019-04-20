import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
};

const documentToItem = <I>(document: Document): I =>
  recursiveConverter({ obj: document, convertersMap }) as I;

export default documentToItem;

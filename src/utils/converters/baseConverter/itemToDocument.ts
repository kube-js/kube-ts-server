import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
};

const documentToItem = (document: Document) =>
  recursiveConverter({ obj: document, convertersMap });

export default documentToItem;

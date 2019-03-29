import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import documentToItemDate from '../helpers/documentToItemDate';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  accountLockoutExpiresAt: documentToItemDate,
  deletedAt: documentToItemDate,
  loginLastAttemptAt: documentToItemDate,
  verifiedAt: documentToItemDate,
};

const documentToItem = <I>(document: Document):I =>  recursiveConverter({ obj: document, convertersMap }) as I;
  
export default documentToItem;

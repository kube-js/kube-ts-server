import { Document } from '@js-items/knex/dist/FacadeConfig';
import baseMap from '../convertersMaps/baseMap';
import documentToItemDateTime from '../helpers/documentToItemDateTime';
import recursiveConverter from '../recursiveConverter';

const convertersMap = {
  ...baseMap,
  accountLockoutExpiresAt: documentToItemDateTime,
  dateOfBirth: documentToItemDateTime,
  deletedAt: documentToItemDateTime,
  loginLastAttemptAt: documentToItemDateTime,
  verifiedAt: documentToItemDateTime,
};

const documentToItem = <I>(document: Document): I =>
  recursiveConverter({ obj: document, convertersMap }) as I;

export default documentToItem;

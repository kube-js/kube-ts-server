import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { Item } from '@js-items/foundation';
import { toCamel } from 'convert-keys';
import Config from '../../../../../presenterFactory/Config';

const createPatch = <I extends Item>(_config: Config): DocumentIntoItem<I> => ({
  document,
}) => toCamel(document);

export default createPatch;

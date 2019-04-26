import CreatePatch from '@js-items/express/dist/types/CreatePatch';
import { Item } from '@js-items/foundation';
import { toCamel } from 'convert-keys';
import Config from '../../../../../presenterFactory/Config';

const createPatch = <I extends Item>(_config: Config): CreatePatch<I> => ({
  document,
}) => toCamel(document);

export default createPatch;

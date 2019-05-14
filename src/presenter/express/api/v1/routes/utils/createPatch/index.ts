import CreatePatch from '@js-items/express/dist/types/CreatePatch';
import { Item } from '@js-items/foundation';
import { toCamel } from 'convert-keys';
import { BaseFactoryConfig } from '../baseFactory';

const createPatch = <I extends Item>(_config: BaseFactoryConfig): CreatePatch<I> => ({
  document,
}) => toCamel(document);

export default createPatch;

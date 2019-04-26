import expressFactory from '@js-items/express/dist/factory';
import FactoryConfig from '@js-items/express/dist/FactoryConfig';
import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import _defaultTo from 'ramda/src/defaultTo';
import Config from '../../../../../presenterFactory/Config';
import beforeCreateItem from '../../utils/beforeCreateItem';
import beforeDeleteItem from '../../utils/beforeDeleteItem';
import beforeDeleteItems from '../../utils/beforeDeleteItems';
import beforeGetItem from '../../utils/beforeGetItem';
import beforeGetItems from '../../utils/beforeGetItems';
import beforeReplaceItem from '../../utils/beforeReplaceItem';
import beforeUpdateItem from '../../utils/beforeUpdateItem';
import convertItemIntoDocument from '../../utils/convertItemIntoDocument';
import createPatch from '../createPatch';

export interface Options<I extends Item> {
  readonly config: Config;
  readonly service: Facade<I>;
  readonly factoryConfig?: Partial<FactoryConfig<I>>;
}

const baseFactory = <I extends Item>({
  config,
  service,
  factoryConfig,
}: Options<I>) => {
  const overrides = _defaultTo({})(factoryConfig);

  return expressFactory<I>({
    beforeCreateItem: beforeCreateItem(config),
    beforeDeleteItem: beforeDeleteItem(config),
    beforeDeleteItems: beforeDeleteItems(config),
    beforeGetItem: beforeGetItem(config),
    beforeGetItems: beforeGetItems(config),
    beforeReplaceItem: beforeReplaceItem(config),
    beforeUpdateItem: beforeUpdateItem(config),
    convertItemIntoDocument: convertItemIntoDocument(config),
    createPatch: createPatch(config),
    service,
    ...overrides,
  });
};

export default baseFactory;

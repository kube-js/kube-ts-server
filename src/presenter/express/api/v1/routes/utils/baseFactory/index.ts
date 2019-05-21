import expressFactory from '@js-items/express/dist/factory';
import FactoryConfig from '@js-items/express/dist/FactoryConfig';
import { Sort } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import { desc } from '@js-items/foundation/dist/interfaces/SortOrder';
import _defaultTo from 'ramda/src/defaultTo';
import Record from 'rulr/Record';
import BaseItem from '../../../../../../../types/items/BaseItem';
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

interface PlainObject {
  readonly [key: string]: any;
}
export interface BaseFactoryConfig extends Config {
  readonly beforeCreateSchema: PlainObject;
  readonly beforeCreateRules: ReturnType<typeof Record>;
  readonly beforeUpdateSchema: PlainObject;
  readonly beforeUpdateRules: ReturnType<typeof Record>;
  readonly beforeReplaceSchema: PlainObject;
  readonly beforeReplaceRules: ReturnType<typeof Record>;
}

export interface Options<I extends BaseItem> {
  readonly config: BaseFactoryConfig;
  readonly service: Facade<I>;
  readonly factoryConfig?: Partial<FactoryConfig<I>>;
}

const baseFactory = <I extends BaseItem>({
  config,
  service,
  factoryConfig,
}: Options<I>) => {
  const overrides = _defaultTo({})(factoryConfig);

  return expressFactory<I>({
    // TODO: add default sort option for express js-items
    beforeCreateItem: beforeCreateItem(config),
    beforeDeleteItem: beforeDeleteItem(config),
    beforeDeleteItems: beforeDeleteItems(config),
    beforeGetItem: beforeGetItem(config),
    beforeGetItems: beforeGetItems(config),
    beforeReplaceItem: beforeReplaceItem(config),
    beforeUpdateItem: beforeUpdateItem(config),
    convertItemIntoDocument: convertItemIntoDocument(config),
    createPatch: createPatch(config),
    // tslint:disable-next-line:no-object-literal-type-assertion
    defaultSort: { createdAt: desc } as Sort<I>,
    service,
    ...overrides,
  });
};

export default baseFactory;

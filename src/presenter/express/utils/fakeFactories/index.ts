import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import _times from 'ramda/src/times';
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../utils/helpers/date/getUtcDate';

export interface OverrideInterface {
  readonly [key: string]: any;
}

export interface Options<I extends Item> {
  readonly times?: number;
  readonly overrides?: Partial<I>;
  readonly service: Facade<I>;
}

const baseFactory = <I extends Item>(itemData: Partial<I>) => async ({
  overrides,
  times,
  service,
}: Options<I>): Promise<I[]> => {
  const models: Partial<I>[] = [];

  const count = times !== undefined ? times : 1;

  _times(() => {
    models.push(itemData);
  }, count);

  const promises = models.map(async model => {
    const id = uuid();
    const item: any = {
      ...model,
      createdAt: getUtcDate(),
      id,
      updatedAt: undefined,
      ...overrides,
    };

    return service.createItem({
      id: item.id,
      item,
    });
  });

  return (await Promise.all(promises)).map(({ item }) => item);
};

export default baseFactory;

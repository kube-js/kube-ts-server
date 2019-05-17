import ItemIntoDocument from '@js-items/express/dist/types/ItemIntoDocument';
import { Item } from '@js-items/foundation';
import { toSnake } from 'convert-keys';
import { BaseFactoryConfig } from '../baseFactory';

const convertItemIntoDocument = <I extends Item>(
  _: BaseFactoryConfig
): ItemIntoDocument<I> => ({ item, req }) => ({
  ...toSnake(item),
  id: req.body.id !== undefined ? req.body.id : item.id,
});

export default convertItemIntoDocument;

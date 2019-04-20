import ItemIntoDocument from '@js-items/express/dist/types/ItemIntoDocument';
import { Item } from '@js-items/foundation';
import { toSnake } from 'convert-keys';
import Config from '../../../../../presenterFactory/Config';

const convertItemIntoDocument = <I extends Item>(
  {}: Config
): ItemIntoDocument<I> => ({ item }) => toSnake(item);

export default convertItemIntoDocument;

import ItemIntoDocument from '@js-items/express/dist/types/ItemIntoDocument';
import { toSnake } from 'convert-keys';
import User from '../../../../../../../../types/items/User';
import getVisiblePublicUserProperties from '../../../../../../../../utils/helpers/model/getVisiblePublicUserProperties';
import Config from '../../../../../../presenterFactory/Config';

const convertItemIntoDocument = (_config: Config): ItemIntoDocument<User> => ({
  item,
}) => {
  const user = getVisiblePublicUserProperties(item);

  return toSnake(user);
};

export default convertItemIntoDocument;

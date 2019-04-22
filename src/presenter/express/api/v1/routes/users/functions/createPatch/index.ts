import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import User from '../../../../../../../../types/items/User';
import Config from '../../../../../../presenterFactory/Config';
import { schema } from '../../../../../../utils/schemas/users/createItem/index';

const createPatch = (_config: Config): DocumentIntoItem<User> => ({
  document,
}) =>{
  const data = _pick(Object.keys(schema), document);

  return toCamel(data);
} 

export default createPatch;

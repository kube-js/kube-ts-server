import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import Role from '../../../../../../../../types/items/Role';
import { beforeCreateSchema } from '../../../../../../utils/schemas/roles/createItem/index';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const convertDocumentIntoItem = (_config: BaseFactoryConfig): DocumentIntoItem<Role> => ({
  document,
}) => {
  const data = _pick(Object.keys(beforeCreateSchema), document);

  return toCamel(data);
};

export default convertDocumentIntoItem;

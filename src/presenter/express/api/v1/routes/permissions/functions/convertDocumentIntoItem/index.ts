import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import Permission from '../../../../../../../../types/items/Permission';
import Config from '../../../../../../presenterFactory/Config';
import { schema } from '../../../../../../utils/schemas/permissions/createItem/index';

const convertDocumentIntoItem = (_config: Config): DocumentIntoItem<Permission> => ({
  document,
}) => {
  const data = _pick(Object.keys(schema), document);

  return toCamel(data);
};

export default convertDocumentIntoItem;

import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import Enrolment from '../../../../../../../../types/items/Enrolment';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const convertDocumentIntoItem = (
  config: BaseFactoryConfig
): DocumentIntoItem<Enrolment> => ({ document }) => {
  const data = _pick(
    [...Object.keys(config.beforeCreateSchema), 'user_id'],
    document
  );

  return toCamel(data);
};

export default convertDocumentIntoItem;

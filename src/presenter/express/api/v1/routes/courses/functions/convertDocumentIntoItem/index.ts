import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import Course from '../../../../../../../../types/items/Course';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const convertDocumentIntoItem = (
  config: BaseFactoryConfig
): DocumentIntoItem<Course> => ({ document }) => {
  const data = _pick(
    [...Object.keys(config.beforeCreateSchema), 'user_id'],
    document
  );

  return toCamel(data);
};

export default convertDocumentIntoItem;

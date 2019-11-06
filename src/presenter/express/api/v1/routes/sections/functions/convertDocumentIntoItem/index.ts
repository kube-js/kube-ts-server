import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import _pick from 'ramda/src/pick';
import Section from '../../../../../../../../types/items/Section';
import { BaseFactoryConfig } from '../../../utils/baseFactory';

const convertDocumentIntoItem = (
  config: BaseFactoryConfig
): DocumentIntoItem<Section> => ({ document }) => {
  const data = _pick(
    Object.keys(config.beforeCreateSchema),
    document
  );

  return toCamel(data);
};

export default convertDocumentIntoItem;

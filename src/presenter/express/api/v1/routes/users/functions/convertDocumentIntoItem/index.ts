import DocumentIntoItem from '@js-items/express/dist/types/DocumentIntoItem';
import { toCamel } from 'convert-keys';
import User from '../../../../../../../../types/items/User';
import Config from '../../../../../../presenterFactory/Config';

const convertDocumentIntoItem = (_config: Config): DocumentIntoItem<User> => ({
  document,
}) => toCamel(document);

export default convertDocumentIntoItem;

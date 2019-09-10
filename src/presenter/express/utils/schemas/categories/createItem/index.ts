import Record from 'rulr/Record';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';
import baseSchema from '../base/schema';

export const beforeCreateSchema = {
  ...baseSchema,
  slug: String(0, VARCHAR_LENGTH),
  title: String(0, VARCHAR_LENGTH),
};

const rules = Record(beforeCreateSchema);

export default rules;

import Record from 'rulr/Record';
import { UUID_LENGTH, VARCHAR_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';
import baseSchema from '../base/schema';

export const beforeCreateSchema = {
  ...baseSchema,
  author_id: String(UUID_LENGTH, UUID_LENGTH),
  slug: String(0, VARCHAR_LENGTH),
  title: String(0, VARCHAR_LENGTH),
};

const rules = Record(beforeCreateSchema);

export default rules;

import Record from 'rulr/Record';
import { UUID_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';
import baseSchema from '../base/schema';

export const beforeCreateSchema = {
  ...baseSchema,
  course_id: String(UUID_LENGTH, UUID_LENGTH),
  user_id: String(UUID_LENGTH, UUID_LENGTH),
};

const rules = Record(beforeCreateSchema);

export default rules;

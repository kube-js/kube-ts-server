import isBoolean from 'rulr/Boolean';
import isNumber from 'rulr/Number';
import Record from 'rulr/Record';
import { UUID_LENGTH, VARCHAR_LENGTH } from '../../../../../../constants';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';
import baseSchema from '../base/schema';

export const beforeUpdateSchema = {
  ...baseSchema,
  course_id: Optional(String(UUID_LENGTH, UUID_LENGTH)),
  is_published: Optional(isBoolean),
  order: Optional(isNumber()),
  title: Optional(String(0, VARCHAR_LENGTH)),
};

const rules = Record(beforeUpdateSchema);

export default rules;

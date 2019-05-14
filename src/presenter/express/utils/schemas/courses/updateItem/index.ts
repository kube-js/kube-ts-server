import Record from 'rulr/Record';
import baseSchema from '../base/schema';

export const beforeUpdateSchema = {
  ...baseSchema,
};

const rules = Record(beforeUpdateSchema);

export default rules;

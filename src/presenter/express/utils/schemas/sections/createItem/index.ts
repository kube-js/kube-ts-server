import Record from 'rulr/Record';
import baseSchema from '../base/schema';

export const beforeCreateSchema = {
  ...baseSchema,
};

const rules = Record(beforeCreateSchema);

export default rules;

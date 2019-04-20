import Record from 'rulr/Record';
import baseSchema from '../base/schema';

export const schema = {
  ...baseSchema,
};

const rules = Record(schema);

export default rules;

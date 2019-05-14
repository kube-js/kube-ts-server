import Record from 'rulr/Record';

import baseSchema from '../base/schema';

export const beforeReplaceSchema = {
  ...baseSchema,
};

const rules = Record(beforeReplaceSchema);

export default rules;

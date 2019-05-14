import Record from 'rulr/Record';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';

import baseSchema from '../base/schema';

export const beforeUpdateSchema = {
  ...baseSchema,
  method: Optional(String(0, VARCHAR_LENGTH)),
  name: Optional(String(0, VARCHAR_LENGTH)),
  url: Optional(String(0, VARCHAR_LENGTH)),
};

const rules = Record(beforeUpdateSchema);

export default rules;

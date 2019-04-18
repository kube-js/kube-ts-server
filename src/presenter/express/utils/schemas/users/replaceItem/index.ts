import Record from 'rulr/Record';
import Email from '../../../../../../utils/validation/rules/Email';
import Optional from '../../../../../../utils/validation/rules/Optional';
import Password from '../../../../../../utils/validation/rules/Password';

import baseSchema from '../base/schema';

export const schema = {
  ...baseSchema,
  email: Optional(Email()),
  password: Optional(Password()),
};

const rules = Record(schema);

export default rules;

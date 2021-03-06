import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import Email from '../../../../../../utils/validation/rules/Email';
import Password from '../../../../../../utils/validation/rules/Password';
import String from '../../../../../../utils/validation/rules/String';
import baseSchema from '../base/schema';

export const schema = {
  ...baseSchema,
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
  password: Intersection([String(0, VARCHAR_LENGTH), Password()]),
};

const rules = Record(schema);

export default rules;

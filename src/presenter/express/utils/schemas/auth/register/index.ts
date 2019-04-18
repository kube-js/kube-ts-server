import Intersection from 'rulr/Intersection';
import Object from 'rulr/Object';
import Record from 'rulr/Record';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import Email from '../../../../../../utils/validation/rules/Email';
import Match from '../../../../../../utils/validation/rules/Match';
import Password from '../../../../../../utils/validation/rules/Password';
import String from '../../../../../../utils/validation/rules/String';
import { schema as baseSchema } from '../../users/createItem';

export const schema = {
  ...baseSchema,
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
  password: Intersection([String(0, VARCHAR_LENGTH), Password()]),
  password_confirmation: Intersection([String(0, VARCHAR_LENGTH), Password()]),
};

const rules = Intersection([
  Object,
  Record(schema),
  Match('password', 'password_confirmation'),
]);

export default rules;

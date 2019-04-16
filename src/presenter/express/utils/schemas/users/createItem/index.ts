import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import { TEXT_LENGTH, VARCHAR_LENGTH } from '../../../../../../constants';
import { GenderType } from '../../../../../../types/items/User';
import Date from '../../../../../../utils/validation/rules/Date';
import Email from '../../../../../../utils/validation/rules/Email';
import Enum from '../../../../../../utils/validation/rules/Enum';
import Optional from '../../../../../../utils/validation/rules/Optional';
import Password from '../../../../../../utils/validation/rules/Password';
import String from '../../../../../../utils/validation/rules/String';

export const schema = {
  bio: Optional(String(0, TEXT_LENGTH)),
  date_of_birth: Optional(Date()),
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
  first_name: Optional(String(0, VARCHAR_LENGTH)),
  gender: Optional(Enum(GenderType)),
  last_name: Optional(String(0, VARCHAR_LENGTH)),
  password: Intersection([String(0, VARCHAR_LENGTH), Password()]),
};

const rules = Record(schema);

export default rules;

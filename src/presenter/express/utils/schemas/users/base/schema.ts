import { TEXT_LENGTH, VARCHAR_LENGTH } from '../../../../../../constants';
import { GenderType } from '../../../../../../types/items/User';
import Date from '../../../../../../utils/validation/rules/Date';
import Enum from '../../../../../../utils/validation/rules/Enum';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  bio: Optional(String(0, TEXT_LENGTH)),
  date_of_birth: Optional(Date()),
  first_name: Optional(String(0, VARCHAR_LENGTH)),
  gender: Optional(Enum(GenderType)),
  last_name: Optional(String(0, VARCHAR_LENGTH)),
};

export default baseSchema;

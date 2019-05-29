import {
  UUID_LENGTH,
} from '../../../../../../constants';
import Date from '../../../../../../utils/validation/rules/Date';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  course_id: Optional(String(UUID_LENGTH, UUID_LENGTH)),
  deleted_at: Optional(Date()),
  user_id: Optional(String(UUID_LENGTH, UUID_LENGTH)),
};

export default baseSchema;

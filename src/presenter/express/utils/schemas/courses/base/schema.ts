import {
  TEXT_LENGTH,
  UUID_LENGTH,
  VARCHAR_LENGTH,
} from '../../../../../../constants';
import Date from '../../../../../../utils/validation/rules/Date';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  deleted_at: Optional(Date()),
  description: Optional(String(0, TEXT_LENGTH)),
  slug: Optional(String(0, VARCHAR_LENGTH)),
  title: Optional(String(0, VARCHAR_LENGTH)),
  user_id: Optional(String(UUID_LENGTH, UUID_LENGTH)),
};

export default baseSchema;

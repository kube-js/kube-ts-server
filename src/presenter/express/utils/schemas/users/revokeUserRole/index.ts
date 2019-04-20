import Record from 'rulr/Record';
import { UUID_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';

export const schema = {
  role_id: String(UUID_LENGTH, UUID_LENGTH),
  user_id: String(UUID_LENGTH, UUID_LENGTH),
};

const rules = Record(schema);

export default rules;

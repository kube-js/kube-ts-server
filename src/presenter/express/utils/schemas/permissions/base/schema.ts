import { VARCHAR_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  method: String(0, VARCHAR_LENGTH),
  name: String(0, VARCHAR_LENGTH),
  url: String(0, VARCHAR_LENGTH),
};

export default baseSchema;

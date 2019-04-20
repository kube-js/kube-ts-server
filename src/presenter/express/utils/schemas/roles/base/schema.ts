import { VARCHAR_LENGTH } from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  name: String(0, VARCHAR_LENGTH),
};

export default baseSchema;

import {
  VARCHAR_LENGTH,
} from '../../../../../../constants';
import Optional from '../../../../../../utils/validation/rules/Optional';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema = {
  slug: Optional(String(0, VARCHAR_LENGTH)),
  title: Optional(String(0, VARCHAR_LENGTH)),
};

export default baseSchema;

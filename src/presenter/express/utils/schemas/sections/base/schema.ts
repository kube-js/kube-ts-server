import isBoolean from 'rulr/Boolean';
import isNumber from 'rulr/Number';
import {
  UUID_LENGTH,
  VARCHAR_LENGTH,
} from '../../../../../../constants';
import String from '../../../../../../utils/validation/rules/String';

const baseSchema: any = {
  course_id: String(UUID_LENGTH, UUID_LENGTH),
  is_published: isBoolean,
  order: isNumber(),
  title: String(0, VARCHAR_LENGTH),
};

export default baseSchema;

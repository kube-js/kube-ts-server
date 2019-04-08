import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import { UUID_LENGTH, VARCHAR_LENGTH } from '../../../../../../constants';
import Email from '../../../../../../utils/validation/rules/Email';
import String from '../../../../../../utils/validation/rules/String';

export const rules = Record({
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
  token: String(UUID_LENGTH, UUID_LENGTH),
});

export default rules;

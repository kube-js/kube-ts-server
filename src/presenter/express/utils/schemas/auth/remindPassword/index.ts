
import Intersection from 'rulr/Intersection';
import Record from 'rulr/Record';
import { VARCHAR_LENGTH } from '../../../../../../constants';
import Email from '../../../../../../utils/validation/rules/Email';
import String from '../../../../../../utils/validation/rules/String';

const rules = Record({
  email: Intersection([String(0, VARCHAR_LENGTH), Email()]),
});

export default rules;

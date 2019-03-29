import moment from 'moment';
import _isNil from 'ramda/src/isNil';

export default (input: any): boolean =>
  !_isNil(input) && moment(input).isAfter(moment());

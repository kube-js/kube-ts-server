import moment from 'moment';
import { ACCOUNT_LOCKOUT_TIME_IN_MINUTES } from '../../../../constants';

export default (): Date =>
  moment()
    .add(ACCOUNT_LOCKOUT_TIME_IN_MINUTES, 'minutes')
    .toDate();

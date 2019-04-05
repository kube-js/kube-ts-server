import moment from 'moment';
import _isNil from 'ramda/src/isNil';

const itemToDocumentDate = (value: any) =>
  !_isNil(value) && moment(value).isValid()
    ? moment(value)
        .utc()
        .toDate()
    : null;

export default itemToDocumentDate;

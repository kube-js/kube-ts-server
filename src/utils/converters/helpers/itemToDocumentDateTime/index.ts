import moment from 'moment';
import _isNil from 'ramda/src/isNil';

const itemToDocumentDateTime = (value: any) =>
  !_isNil(value) && moment(value).isValid()
    ? moment.utc(value)
        .toDate()
    : null;

export default itemToDocumentDateTime;

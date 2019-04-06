import moment from 'moment';

const getUtcDate = (value?: any, format?: any) =>
  moment.utc(value, format).toDate();

export default getUtcDate;

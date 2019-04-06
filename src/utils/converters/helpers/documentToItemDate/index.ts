import moment from 'moment';

 const documentToItemDate = (value: any) =>
  value === null ? undefined : moment(value).format('YYYY-MM-DD');

  export default documentToItemDate;

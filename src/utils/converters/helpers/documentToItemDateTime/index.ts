import moment from 'moment';

 const documentToItemDate = (value: any) =>
  value === null ? undefined : moment(value).utc().toDate();

  export default documentToItemDate;

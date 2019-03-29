import moment from 'moment';

 const documentToItemDate = (value: any) =>
  value === null ? undefined : moment(value).toDate();

  export default documentToItemDate;

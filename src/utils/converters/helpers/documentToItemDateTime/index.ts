import moment from 'moment';

 const documentToItemDateTime = (value: any) =>
  value === null ? undefined : moment.utc(value).toDate();

  export default documentToItemDateTime;

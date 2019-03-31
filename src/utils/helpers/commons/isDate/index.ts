// @credits:  https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
// as moment(value).isValid() is depreceated
export default (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Date]' &&
  !isNaN(value.getTime());

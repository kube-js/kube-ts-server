import moment, { Moment, MomentInputObject } from 'moment';

type MomentInput =
  | Moment
  | Date
  | string
  | number
  | (number | string)[]
  | MomentInputObject
  | void; // null | undefined

export default (input: MomentInput): boolean =>
  moment(input).isAfter(moment());

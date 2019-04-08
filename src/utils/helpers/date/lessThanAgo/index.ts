import moment, { DurationInputArg1, unitOfTime } from 'moment';

export interface Options {
  readonly date: Date;
  readonly value: DurationInputArg1;
  readonly unit: unitOfTime.DurationConstructor;
}

export default ({ date, value, unit }: Options): boolean =>
  moment(date).isAfter(moment().subtract(value, unit));

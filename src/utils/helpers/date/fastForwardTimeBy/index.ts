import moment, { DurationInputArg1, unitOfTime } from 'moment';

export default (
  value: DurationInputArg1,
  unit: unitOfTime.DurationConstructor
): Date =>
  moment()
    .add(value, unit)
    .utc()
    .toDate();

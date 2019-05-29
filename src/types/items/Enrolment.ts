import BaseItem, { NullableDate } from './BaseItem';

export default interface Enrolment extends BaseItem {
  readonly userId: string;
  readonly courseId: string;
  readonly deletedAt?: NullableDate;
}

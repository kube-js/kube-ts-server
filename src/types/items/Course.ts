import BaseItem, { NullableDate } from './BaseItem';

export default interface Course extends BaseItem {
  readonly authorId: string;
  readonly title: string;
  readonly slug: string;
  readonly description?: string;
  readonly deletedAt?: NullableDate;
}

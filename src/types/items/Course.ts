import BaseItem, { NullableDate } from './BaseItem';

export default interface Course extends BaseItem {
  readonly userId: string;
  readonly title: string;
  readonly slug: string;
  readonly categoryId: string;
  readonly imageUrl?: string;
  readonly isPaid?: boolean;
  readonly isPublished?: boolean;
  readonly isApproved?: boolean;
  readonly description?: string;
  readonly goals?: string;
  readonly requirements?: string;
  readonly deletedAt?: NullableDate;
}

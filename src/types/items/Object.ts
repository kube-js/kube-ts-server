import BaseItem, { NullableDate } from './BaseItem';

export enum UnitType {
  video = 'video',
  document = 'document'
}

export default interface Unit extends BaseItem {
  readonly moduleId: string;
  readonly sortOrder: number;
  readonly type: UnitType;
  readonly title: string;
  readonly description?: string;
  readonly slug: string;
  readonly isPaid?: boolean;
  readonly isPublished?: boolean;
  readonly deletedAt?: NullableDate;
}

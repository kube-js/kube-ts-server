import BaseItem, { NullableDate } from './BaseItem';

export enum ObjectType {
  video = 'video',
  document = 'document'
}

export default interface Object extends BaseItem {
  readonly sectionId: string;
  readonly sortOrder: number;
  readonly type: ObjectType;
  readonly title: string;
  readonly description?: string;
  readonly slug: string;
  readonly isPaid?: boolean;
  readonly isPublished?: boolean;
  readonly deletedAt?: NullableDate;
}

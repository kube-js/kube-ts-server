import { Item } from '@js-items/foundation';

export type NullableDate = Date | null;

export default interface BaseItem extends Item {
  readonly createdAt: NullableDate;
  readonly updatedAt?: NullableDate;
}

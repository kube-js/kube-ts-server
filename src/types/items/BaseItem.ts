import { Item } from '@js-items/foundation';

export default interface BaseItem extends Item {
  readonly createdAt: Date;
  readonly updatedAt?: Date;
}

import { BaseError } from 'make-error';

export default class ConflictError extends BaseError {
  public readonly itemName: string;
  public readonly itemId: string;

  constructor(itemName: string, itemId: string) {
    super();
    this.itemName = itemName;
    this.itemId = itemId;
  }
}

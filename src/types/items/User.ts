import BaseItem from './BaseItem';

export default interface User extends BaseItem {
  readonly email: string;
  readonly password?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly verifiedAt?: Date;
  readonly deletedAt?: Date;
}

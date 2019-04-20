import BaseItem from './BaseItem';

export default interface UserRole extends BaseItem {
  readonly userId: string;
  readonly roleId: string;
}

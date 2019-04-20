import BaseItem from './BaseItem';

export default interface RolePermission extends BaseItem {
  readonly roleId: string;
  readonly permissionId: string;
}

import BaseItem from './BaseItem';

export default interface ResetPasswordToken extends BaseItem {
  readonly userId: string;
  readonly expiresAt: Date;
}

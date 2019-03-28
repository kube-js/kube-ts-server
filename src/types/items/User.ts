import BaseItem from './BaseItem';

export enum GenderType {
  male = 'male',
  female = 'female',
}

export default interface User extends BaseItem {
  readonly email: string;
  readonly password?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly dateOfBirth?: Date;
  readonly gender?: GenderType;
  readonly verifiedAt?: Date;
  readonly deletedAt?: Date;
  readonly loginFailedAttempts?: number;
  readonly loginLastAttemptAt?: Date;
  readonly accountLockoutExpiresAt?: Date; 
}


import { BaseError } from 'make-error';

export default class ExpiredResetPasswordTokenError extends BaseError {
  public email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }
}

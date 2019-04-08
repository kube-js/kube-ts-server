import { BaseError } from 'make-error';

export default class InvalidResetPasswordTokenError extends BaseError {
  public email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }
}

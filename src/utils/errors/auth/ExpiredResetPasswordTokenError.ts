import { BaseError } from 'make-error';

export default class ExpiredResetPasswordTokenError extends BaseError {
  public token: string;

  constructor(token: string) {
    super();
    this.token = token;
  }
}

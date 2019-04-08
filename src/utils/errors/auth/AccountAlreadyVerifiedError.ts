import { BaseError } from 'make-error';

export default class AccountAlreadyVerifiedError extends BaseError {
  public email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }
}

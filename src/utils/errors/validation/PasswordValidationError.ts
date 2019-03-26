import ValidationError from 'rulr/ValidationError';

export class PasswordValidationError extends ValidationError {
  constructor(data: unknown) {
    super(
      `expected string containing minimum eight characters, at least one letter, one number and one special character`,
      data
    );
  }
}

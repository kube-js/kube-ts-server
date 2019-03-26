import ValidationError from 'rulr/ValidationError';

export class EmailValidationError extends ValidationError {
  constructor(data: unknown) {
    super(`expected valid email`, data);
  }
}

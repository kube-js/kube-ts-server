import ValidationError from 'rulr/ValidationError';

export default class EmailValidationError extends ValidationError {
  constructor(data: unknown) {
    super(`expected valid email`, data);
  }
}

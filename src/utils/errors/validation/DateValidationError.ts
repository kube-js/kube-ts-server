import ValidationError from 'rulr/ValidationError';

export default class DateValidationError extends ValidationError {
  constructor(data: unknown) {
    super(`expected valid date`, data);
  }
}

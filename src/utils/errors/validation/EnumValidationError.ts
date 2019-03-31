import ValidationError from 'rulr/ValidationError';

export default class EnumValidationError extends ValidationError {
  constructor(data: unknown) {
    super(`expected valid enum value`, data);
  }
}

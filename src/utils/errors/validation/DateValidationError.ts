import ValidationError from 'rulr/ValidationError';

export default class DateValidationError extends ValidationError {
  public readonly expectedFormats: string[];

  constructor(data: unknown, expectedFormats: string[]) {
    super(`expected valid date`, data);
    this.expectedFormats = expectedFormats;
  }
}

import ValidationError from 'rulr/ValidationError';

export default class MatchValidationError extends ValidationError {
  public readonly fieldOne: string;
  public readonly fieldTwo: string;

  constructor(data: unknown, fieldOne: string, fieldTwo: string) {
    super(`expected fields to match`, data);
    this.fieldOne = fieldOne;
    this.fieldTwo = fieldTwo;
  }
}

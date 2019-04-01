import ValidationError from 'rulr/ValidationError';

export type EnumKeys = string[] | number[];
export default class EnumValidationError extends ValidationError {
  public readonly enumValues: EnumKeys;

  constructor(data: unknown, enumValues: EnumKeys) {
    super(`expected valid enum value`, data);
    this.enumValues = enumValues;
  }
}

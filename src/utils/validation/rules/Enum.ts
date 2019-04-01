import Rule from 'rulr/Rule';
import EnumValidationError from '../../errors/validation/EnumValidationError';

export const getEnumValues = <T>(enumType: T): any[] => {
  const keys = Object.keys(enumType);

  const numKeys = keys.filter((val: string) => !Number.isNaN(val as any));

  if (numKeys.length === 0) {
    return keys;
  }

  return numKeys;
};

export default <T>(enumType: T): Rule<T> => (data: T) => {
  const enumValues = getEnumValues(enumType);

  if (enumValues.includes(data)) {
    return [];
  }

  return [new EnumValidationError(data, enumValues)];
};

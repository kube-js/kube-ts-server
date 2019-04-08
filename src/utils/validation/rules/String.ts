import { StringValidationError } from "rulr/String";

export default function(minLength = 0, maxLength = Infinity) {
  return (data: any) => {
    if (
      typeof data === 'string' &&
      /* allow inclusive minLength and maxLength values */
      data.length >= minLength &&
      data.length <= maxLength
    ) {
      return [];
    }

    return [new StringValidationError(data, minLength, maxLength)];
  };
}

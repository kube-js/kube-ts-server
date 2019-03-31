import DateValidationError from '../../errors/validation/DateValidationError';
import isDate from '../../helpers/commons/isDate';

export default function() {
  return (data: string) => {
    if (isDate(data)) {
      return [];
    }

    return [new DateValidationError(data)];
  };
}

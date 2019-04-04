import { DEFAULT_DATE_FORMATS } from '../../../constants';
import DateValidationError from '../../errors/validation/DateValidationError';
import isDate from '../../helpers/commons/isDate';

export default function(expectedFormats: string[] = DEFAULT_DATE_FORMATS) {
  return (data: string) => {
    if (isDate({ value: data, expectedFormats })) {
      return [];
    }

    return [new DateValidationError(data, expectedFormats)];
  };
}

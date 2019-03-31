import MatchValidationError from '../../errors/validation/MatchValidationError';
import isString from '../../helpers/commons/isString';

export default function(fieldOne: string, fieldTwo: string) {
  return (data: any) => {
    if (
      isString(data[fieldOne]) &&
      isString(data[fieldTwo]) &&
      data[fieldOne] === data[fieldTwo]
    ) {
      return [];
    }

    return [new MatchValidationError(data, fieldOne, fieldTwo)];
  };
}

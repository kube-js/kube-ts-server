import { REGEXP_PASSWORD } from '../../../constants';
import PasswordValidationError from '../../errors/validation/PasswordValidationError';

export default function() {
  return (data: string) => {
    if (REGEXP_PASSWORD.test(data)) {
      return [];
    }

    return [new PasswordValidationError(data)];
  };
}

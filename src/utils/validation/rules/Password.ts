import { REGEXP_PASSWORD } from '../../../constants';
import EmailValidationError from '../../errors/validation/EmailValidationError';

export default function() {
  return (data: string) => {
    if (REGEXP_PASSWORD.test(data)) {
      return [];
    }

    return [new EmailValidationError(data)];
  };
}

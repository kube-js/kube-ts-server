import { REGEXP_EMAIL } from '../../../constants';
import EmailValidationError from '../../errors/validation/EmailValidationError';

export default function() {
  return (data: string) => {
    if (REGEXP_EMAIL.test(data)) {
      return [];
    }

    return [new EmailValidationError(data)];
  };
}

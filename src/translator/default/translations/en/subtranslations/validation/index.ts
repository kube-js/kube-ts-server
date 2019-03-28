import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import { EmailValidationError } from '../../../../../../utils/errors/validation/EmailValidationError';
import { PasswordValidationError } from '../../../../../../utils/errors/validation/PasswordValidationError';
import Validation from '../../../interfaces/Validation';

const validationErrorsTranslations: Validation = {
  emailValidationError: (_error: EmailValidationError) => 'Invalid email',
  passwordValidationError: (_error: PasswordValidationError) =>
    'Expected string minimum 8 characters long, containing at least: 1 upper and 1 lower case, 1 digit and 1special characters (i.e. one of the following !@#$%^&*)',
  stringValidationError: (error: StringValidationError) =>
    `Expected string with a length between ${error.minLength} and ${
      error.maxLength
    }`,
  unknownValidationError: (_error: ValidationError) => 'Unknown error',

  validationFailed: () => 'Validation failed',
};

export default validationErrorsTranslations;

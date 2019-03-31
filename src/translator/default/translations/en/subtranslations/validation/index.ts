import { StringValidationError } from 'rulr/String';
import MatchValidationError from '../../../../../../utils/errors/validation/MatchValidationError';
import Validation from '../../../interfaces/Validation';

const validationErrorsTranslations: Validation = {
  dateValidationError: () => `Invalid date`,
  emailValidationError: () => 'Invalid email',
  matchValidationError: (error: MatchValidationError) =>
    `Expected ${error.fieldOne} to match ${error.fieldTwo}`,
  passwordValidationError: () =>
    'Expected string minimum 8 characters long, containing at least: 1 upper and 1 lower case, 1 digit and 1special characters (i.e. one of the following !@#$%^&*)',
  stringValidationError: (error: StringValidationError) =>
    `Expected string with a length between ${error.minLength} and ${
      error.maxLength
    } characters`,
  unknownValidationError: () => 'Unknown error',
  validationFailed: () => 'Validation failed',
};

export default validationErrorsTranslations;

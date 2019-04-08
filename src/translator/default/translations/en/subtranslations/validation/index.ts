import { StringValidationError } from 'rulr/String';
import DateValidationError from '../../../../../../utils/errors/validation/DateValidationError';
import EnumValidationError from '../../../../../../utils/errors/validation/EnumValidationError';
import MatchValidationError from '../../../../../../utils/errors/validation/MatchValidationError';
import Validation from '../../../interfaces/Validation';

const validationErrorsTranslations: Validation = {
  dateValidationError: (error: DateValidationError) =>
    `Expected date in one of the formats: ${error.expectedFormats.join(', ')}`,
  emailValidationError: () => 'Invalid email',
  enumValidationError: (error: EnumValidationError) =>
    `Expected one of the following: ${error.enumValues.join(', ')}`,
  matchValidationError: (error: MatchValidationError) =>
    `Expected ${error.fieldOne} to match ${error.fieldTwo}`,
  passwordValidationError: () =>
    'Expected string minimum 8 characters long, containing at least: 1 upper and 1 lower case, 1 digit and 1 special characters i.e. one of the following: #?!@$%^&*-',
  stringValidationError: (error: StringValidationError) => {
    const numberOfCharacters =
      error.minLength === error.maxLength
        ? `${error.minLength} characters long`
        : `between ${error.minLength} and ${error.maxLength} characters long`;

    return `Expected string ${numberOfCharacters}`;
  },
  unknownValidationError: () => 'Unknown error',
  validationFailed: () => 'Validation failed',
};

export default validationErrorsTranslations;

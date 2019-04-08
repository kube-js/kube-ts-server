import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import DateValidationError from '../../../../../../utils/errors/validation/DateValidationError';
import EmailValidationError from '../../../../../../utils/errors/validation/EmailValidationError';
import EnumValidationError from '../../../../../../utils/errors/validation/EnumValidationError';
import MatchValidationError from '../../../../../../utils/errors/validation/MatchValidationError';
import PasswordValidationError from '../../../../../../utils/errors/validation/PasswordValidationError';
import Validation from '../../../interfaces/Validation';

const validation: Validation = {
  dateValidationError: (error: DateValidationError) => `Wymagana data w jednym z podanych formatów: ${error.expectedFormats.join(', ')}`,
  emailValidationError: (_error: EmailValidationError) =>
    'Niepoprawny adres e-mail',
  enumValidationError: (error: EnumValidationError) =>
    `Wymagane jedno z następujących: ${error.enumValues.join(', ')}`,
  matchValidationError: (error: MatchValidationError) =>
    `Pola ${error.fieldOne} i ${error.fieldTwo} muszą być taką samą wartość`,
  passwordValidationError: (_error: PasswordValidationError) =>
    'Wymagany ciąg znaków o dlugości minimum 8 znaków, zawierający co najmniej: jedną dużą i jedną małą literę, jedną cyfrę i jeden znak specjalny (np. jeden z następujących: #?!@$%^&*-)',
  stringValidationError: (error: StringValidationError) => {
    const numberOfCharacters = error.minLength === error.maxLength ? `${error.minLength}`:`pomiędzy ${error.minLength} a ${
      error.maxLength
    }`;

    return `Wymagany ciąg znaków o dlugości ${numberOfCharacters} znaków.`;
  },
  unknownValidationError: (_error: ValidationError) =>
    'Niezidentyfikowany problem',
  validationFailed: () => 'Walidacja danych niepowiodła się',
};

export default validation;

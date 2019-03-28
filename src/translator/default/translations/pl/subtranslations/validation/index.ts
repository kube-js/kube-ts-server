import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import { EmailValidationError } from '../../../../../../utils/errors/validation/EmailValidationError';
import { PasswordValidationError } from '../../../../../../utils/errors/validation/PasswordValidationError';
import Validation from '../../../interfaces/Validation';

const validation: Validation = {
  emailValidationError: (_error: EmailValidationError) =>
    'Niepoprawny adres e-mail',
  passwordValidationError: (_error: PasswordValidationError) =>
    'Wymagany ciąg znaków o dlugości minimum 8 znaków, zawierający co najmniej: jedną dużą i jedną małą literę, jedną cyfrę i jeden znak specjalny (np. jeden z następujących: $#@!%^&*)',
  stringValidationError: (error: StringValidationError) =>
    `Wymagany ciąg znaków o dlugości pomiędzy ${error.minLength} a ${
      error.maxLength
    } znaków`,
  unknownValidationError: (_error: ValidationError) =>
    'Niezidentyfikowany problem',
  validationFailed: () => 'Walidacja danych niepowiodła się',
};

export default validation;

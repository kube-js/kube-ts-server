import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import { EmailValidationError } from '../../../utils/errors/validation/EmailValidationError';
import { PasswordValidationError } from '../../../utils/errors/validation/PasswordValidationError';

export interface ValidationErrorsTranslations {
  readonly stringValidationError: (error: StringValidationError) => string;
  readonly emailValidationError: (error: EmailValidationError) => string;
  readonly passwordValidationError: (error: PasswordValidationError) => string;
  readonly unknownValidationError: (error: ValidationError) => string;
}

import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import EmailValidationError from '../../../../utils/errors/validation/EmailValidationError';
import MatchValidationError from '../../../../utils/errors/validation/MatchValidationError';
import PasswordValidationError from '../../../../utils/errors/validation/PasswordValidationError';

export default interface Validation {
  readonly validationFailed: () => string;
  readonly stringValidationError: (error: StringValidationError) => string;
  readonly emailValidationError: (error: EmailValidationError) => string;
  readonly passwordValidationError: (error: PasswordValidationError) => string;
  readonly unknownValidationError: (error: ValidationError) => string;
  readonly matchValidationError: (error: MatchValidationError) => string;
}

import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import DateValidationError from '../../../../utils/errors/validation/DateValidationError';
import EmailValidationError from '../../../../utils/errors/validation/EmailValidationError';
import EnumValidationError from '../../../../utils/errors/validation/EnumValidationError';
import MatchValidationError from '../../../../utils/errors/validation/MatchValidationError';
import PasswordValidationError from '../../../../utils/errors/validation/PasswordValidationError';

export default interface Validation {
  readonly enumValidationError: (error: EnumValidationError) => string;
  readonly dateValidationError: (error: DateValidationError) => string;
  readonly validationFailed: () => string;
  readonly stringValidationError: (error: StringValidationError) => string;
  readonly emailValidationError: (error: EmailValidationError) => string;
  readonly passwordValidationError: (error: PasswordValidationError) => string;
  readonly unknownValidationError: (error: ValidationError) => string;
  readonly matchValidationError: (error: MatchValidationError) => string;
}

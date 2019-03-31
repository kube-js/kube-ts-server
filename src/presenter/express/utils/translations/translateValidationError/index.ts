import { StringValidationError } from 'rulr/String';
import ValidationError from 'rulr/ValidationError';
import Translation from '../../../../../translator/default/translations/interfaces';
import EmailValidationError from '../../../../../utils/errors/validation/EmailValidationError';
import MatchValidationError from '../../../../../utils/errors/validation/MatchValidationError';
import PasswordValidationError from '../../../../../utils/errors/validation/PasswordValidationError';

export interface Options {
  readonly translation: Translation;
  readonly error: ValidationError;
}

export default ({ translation, error }: Options) => {
  switch (error.constructor) {
    case StringValidationError:
      return translation.stringValidationError(error as StringValidationError);
    case EmailValidationError:
      return translation.emailValidationError(error as EmailValidationError);
    case PasswordValidationError:
      return translation.passwordValidationError(
        error as PasswordValidationError
      );
    case MatchValidationError:
      return translation.matchValidationError(
        error as MatchValidationError
      );
    default:
      return translation.unknownValidationError(error);
  }
};

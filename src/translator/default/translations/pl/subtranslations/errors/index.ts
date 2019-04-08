import { ACCOUNT_LOCKOUT_TIME_IN_MINUTES } from '../../../../../../constants';
import ConflictError from '../../../../../../utils/errors/http/ConflictError';
import Errors from '../../../interfaces/Errors';

const errors: Errors = {
  accountAlreadyVerified: () => 'Konto zostało już akywowane',
  accountLocked: () => `Zbyt wiele prób nieudanego logowania.
 Twoje konto zostało zablokowane na ${ACCOUNT_LOCKOUT_TIME_IN_MINUTES} minut`,
 conflict: (error: ConflictError) => `Model typu ${error.itemName} już istnieje`,
  expiredJwtToken: () => 'Token JWT utracił ważność',
  expiredResetPasswordtoken: () => `Reset password token utracił ważność`,
  forbidden: () => 'Brak uprawnień',
  invalidCredentials: () => 'Niewłaściwy email i/lub password',
  invalidJwtToken: () => 'Niewłaściwy JWT token',
  invalidResetPasswordtoken: () => `Niewłaściwy reset password token`,
  invalidVerifyAccountToken: () => '`Niewłaściwy email i/lub verify account token',
  missingJwtToken: () => 'Nieobecny JWT token',
  missingJwtTokenExtractor: () => 'Brak JWT token ekstraktor',
  serverError: () => 'Błąd serwera',
  unauthorized: () => 'Nieuwierzytelniony',
  unverifiedAccount: () =>
    'Konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę odbiorczą email i zweryfikuj swoje konto klikając w link',
};

export default errors;

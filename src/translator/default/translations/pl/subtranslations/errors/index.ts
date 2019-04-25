import { ItemNotFoundError } from '@js-items/foundation';
import { ACCOUNT_LOCKOUT_TIME_IN_MINUTES } from '../../../../../../constants';
import ConflictError from '../../../../../../utils/errors/http/ConflictError';
import Errors from '../../../interfaces/Errors';

const errors: Errors = {
  accountAlreadyVerified: () => 'Konto zostało już akywowane',
  accountLocked: () => `Zbyt wiele prób nieudanego logowania.
 Twoje konto zostało zablokowane na ${ACCOUNT_LOCKOUT_TIME_IN_MINUTES} minut`,
  conflict: (error: ConflictError) =>
    `Model typu ${error.itemName} już istnieje`,
  expiredJwtToken: () => 'Token JWT utracił ważność',
  expiredResetPasswordtoken: () => `Reset password token utracił ważność`,
  forbidden: () => 'Brak uprawnień do wykonania tej akcji',
  invalidCredentials: () => 'Niewłaściwy email i/lub password',
  invalidJwtToken: () => 'Niewłaściwy JWT token',
  invalidResetPasswordtoken: () => `Niewłaściwy reset password token`,
  invalidVerifyAccountToken: () =>
    '`Niewłaściwy email i/lub verify account token',
  itemNotFound: (error: ItemNotFoundError) =>
    `Nie znaleziono modelu ${error.itemName} o id ${error.itemId}`,
  missingJwtToken: () => 'Nieobecny JWT token',
  missingJwtTokenExtractor: () => 'Brak JWT token ekstraktor',
  notFound: () => 'Nie znaleziono',
  serverError: () => 'Błąd serwera',
  unauthenticated: () => 'Nieuwierzytelniony',
  unsupportedMediaType: () =>
    'Content-Type header musi być ustawiony na application/json',
  unverifiedAccount: () =>
    'Konto nie zostało jeszcze zweryfikowane. Sprawdź swoją skrzynkę odbiorczą email i zweryfikuj swoje konto klikając w link',
};

export default errors;

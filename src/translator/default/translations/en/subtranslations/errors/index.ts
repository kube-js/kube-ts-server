import { ItemNotFoundError } from '@js-items/foundation';
import {
  ACCOUNT_LOCKOUT_TIME_IN_MINUTES,
  VERIFY_LOCKOUT_TIME_IN_MINUTES,
} from '../../../../../../constants';
import ConflictError from '../../../../../../utils/errors/http/ConflictError';
import Errors from '../../../interfaces/Errors';

const errorsTranslations: Errors = {
  accountAlreadyVerified: () => 'Account has been already verified',
  accountLocked: () => `Too many invalid login attempts.
  Your account has been locked for ${ACCOUNT_LOCKOUT_TIME_IN_MINUTES} minutes`,

  conflict: (error: ConflictError) => `${error.itemName} already exists`,
  expiredJwtToken: () => 'Expired JWT token',
  expiredResetPasswordtoken: () => `Expired reset password token`,
  forbidden: () => 'Not enough permissions to perform this action',
  invalidCredentials: () => 'Invalid email and/or password',
  invalidJwtToken: () => 'Invalid JWT token',
  invalidResetPasswordtoken: () => `Invalid reset password token`,
  invalidVerifyAccountToken: () => 'Invalid email and/or verify account token',
  itemNotFound: (error: ItemNotFoundError) =>
    `Model ${error.itemName} with id ${error.itemId} not found`,
  missingJwtToken: () => 'Missing JWT token',
  missingJwtTokenExtractor: () => 'Missing JWT token extractor',
  notFound: () => 'Not found',
  serverError: () => 'Server error',
  serviceIsUnavailable: () => 'Service is unavailable',
  unauthenticated: () => 'Unauthenticated',
  unsupportedMediaType: () =>
    'Content-Type header must be set to application/json',
  unverifiedAccount: () =>
    'Account unverified. Please verify you email by clicking an email you received from us',
  verifyFunctionalityLocked: () => `Too many verify account attempts. Try again in ${VERIFY_LOCKOUT_TIME_IN_MINUTES} minutes`,
  verifyTokenSent: () => 'VerifyToken has been sent. Please check your email',
};

export default errorsTranslations;

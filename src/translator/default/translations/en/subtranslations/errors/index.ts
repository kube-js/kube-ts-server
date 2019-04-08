import { ACCOUNT_LOCKOUT_TIME_IN_MINUTES } from '../../../../../../constants';
import ConflictError from '../../../../../../utils/errors/http/ConflictError';
import Errors from '../../../interfaces/Errors';

const errorsTranslations: Errors = {
  accountLocked: () => `Too many invalid login attempts.
  Your account has been locked for ${ACCOUNT_LOCKOUT_TIME_IN_MINUTES} minutes`,
  conflict: (error: ConflictError) => `Model of type ${error.itemName} already exists`,
  expiredJwtToken: () => 'Expired JWT token',
  expiredResetPasswordtoken: () => `Expired reset password token`,
  forbidden: () => 'Forbidden',
  invalidCredentials: () => 'Invalid email and/or password',
  invalidJwtToken: () => 'Invalid JWT token',
  invalidResetPasswordtoken: () => `Invalid reset password token`,
  missingJwtToken: () => 'Missing JWT token',
  missingJwtTokenExtractor: () => 'Missing JWT token extractor',
  serverError: () => 'Server error',
  unauthorized: () => 'Unauthorized',
  unverifiedAccount: () =>
    'Account unverified. Please verify you email by clicking an email you received from us',
};

export default errorsTranslations;

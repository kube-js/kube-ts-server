import { ItemNotFoundError } from '@js-items/foundation';
import { Request, Response } from 'express';
import {
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  SERVICE_UNAVAILABLE,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';
import ValidationErrors from 'rulr/ValidationErrors';
import AccountAlreadyVerifiedError from '../../../../../utils/errors/auth/AccountAlreadyVerifiedError';
import ExpiredJwtTokenError from '../../../../../utils/errors/auth/ExpiredJwtTokenError';
import ExpiredResetPasswordTokenError from '../../../../../utils/errors/auth/ExpiredResetPasswordTokenError';
import ForbiddenError from '../../../../../utils/errors/auth/ForbiddenError';
import InvalidCredentialsError from '../../../../../utils/errors/auth/InvalidCredentialsError';
import InvalidJwtTokenError from '../../../../../utils/errors/auth/InvalidJwtTokenError';
import InvalidResetPasswordTokenError from '../../../../../utils/errors/auth/InvalidResetPasswordTokenError';
import InvalidVerifyAccountTokenError from '../../../../../utils/errors/auth/InvalidVerifyAccountTokenError';
import LockedAccountError from '../../../../../utils/errors/auth/LockedAccountError';
import MissingJwtTokenError from '../../../../../utils/errors/auth/MissingJwtTokenError';
import MissingJwtTokenExtractorError from '../../../../../utils/errors/auth/MissingJwtTokenExtractorError';
import RemindPasswordError from '../../../../../utils/errors/auth/RemindPasswordError';
import UnauthorizedError from '../../../../../utils/errors/auth/UnauthorizedError';
import UnverifiedAccountError from '../../../../../utils/errors/auth/UnverifiedAccountError';
import VerifyLockoutError from '../../../../../utils/errors/auth/VerifyLockoutError';
import ConflictError from '../../../../../utils/errors/http/ConflictError';
import NotFoundError from '../../../../../utils/errors/http/NotFoundError';
import ServiceUnavailableError from '../../../../../utils/errors/http/ServiceUnavailableError';
import Config from '../../../presenterFactory/Config';
import mapValidationErrorsToResponse from '../../translations/mapValidationErrorsToResponse';

export interface Options {
  readonly config: Config;
  readonly req: Request;
  readonly res: Response;
  readonly error: any;
  readonly transactionId: string;
}

// tslint:disable-next-line:cyclomatic-complexity
export default ({ req, res, error, config, transactionId }: Options) => {
  const { translator } = config;
  const translations = translator({ req });

  let status = INTERNAL_SERVER_ERROR;
  let message: any = translations.serverError();
  let errorsObj = {};

  if (error instanceof ValidationErrors) {
    status = UNPROCESSABLE_ENTITY;
    message = translations.validationFailed();
    errorsObj = mapValidationErrorsToResponse({
      errors: error.errors,
      req,
      translator,
    });
  }

  if (error instanceof InvalidCredentialsError) {
    status = UNAUTHORIZED;
    message = translations.invalidCredentials();
  }

  if (error instanceof UnauthorizedError) {
    status = UNAUTHORIZED;
    message = translations.unauthenticated();
  }

  if (error instanceof MissingJwtTokenError) {
    status = UNAUTHORIZED;
    message = translations.missingJwtToken();
  }

  if (error instanceof LockedAccountError) {
    status = UNAUTHORIZED;
    message = translations.accountLocked();
  }

  if (error instanceof VerifyLockoutError) {
    status = TOO_MANY_REQUESTS;
    message = translations.verifyFunctionalityLocked();
  }

  if (error instanceof MissingJwtTokenExtractorError) {
    status = UNAUTHORIZED;
    message = translations.missingJwtTokenExtractor();
  }

  if (error instanceof ExpiredJwtTokenError) {
    status = UNAUTHORIZED;
    message = translations.expiredJwtToken();
  }

  if (error instanceof InvalidJwtTokenError) {
    status = UNAUTHORIZED;
    message = translations.invalidJwtToken();
  }

  if (error instanceof UnverifiedAccountError) {
    status = UNAUTHORIZED;
    message = translations.unverifiedAccount();
  }

  if (error instanceof ForbiddenError) {
    status = FORBIDDEN;
    message = translations.forbidden();
  }

  if (error instanceof ConflictError) {
    status = CONFLICT;
    message = translations.conflict(error);
  }

  if (error instanceof RemindPasswordError) {
    // for security reasons return same response as email would exist in db
    status = OK;
    message = translations.resetPasswordLinkSent();
  }

  if (error instanceof InvalidResetPasswordTokenError) {
    status = UNPROCESSABLE_ENTITY;
    message = translations.invalidResetPasswordtoken();
  }

  if (error instanceof ExpiredResetPasswordTokenError) {
    status = UNPROCESSABLE_ENTITY;
    message = translations.expiredResetPasswordtoken();
  }

  if (error instanceof InvalidVerifyAccountTokenError) {
    status = UNPROCESSABLE_ENTITY;
    message = translations.invalidVerifyAccountToken();
  }

  if (error instanceof NotFoundError) {
    status = NOT_FOUND;
    message = translations.notFound();
  }

  if (error instanceof ItemNotFoundError) {
    status = NOT_FOUND;
    message = translations.itemNotFound(error);
  }

  if (error instanceof AccountAlreadyVerifiedError) {
    status = CONFLICT;
    message = translations.accountAlreadyVerified();
  }

  if (error instanceof ServiceUnavailableError) {
    status = SERVICE_UNAVAILABLE;
    message = translations.serviceIsUnavailable();
  }

  config.logger.error(
    `transactionId: ${transactionId}: - ${JSON.stringify(message)}`,
    error
  );

  res.status(status).json({ ...errorsObj, message, transactionId });
  // tslint:disable-next-line:max-file-line-count
};

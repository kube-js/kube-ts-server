import { ItemNotFoundError } from '@js-items/foundation';
import { Request, Response } from 'express';
import {
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
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
import ConflictError from '../../../../../utils/errors/http/ConflictError';
import Config from '../../../presenterFactory/Config';
import mapValidationErrorsToResponse from '../../translations/mapValidationErrorsToResponse';

export interface Options {
  readonly config: Config;
  readonly req: Request;
  readonly res: Response;
  readonly error: any;
  readonly errorId: string;
}

export default ({ req, res, error, config }: Options) => {
  const { translator } = config;
  const translations = translator({ req });
  // TODO: logging (to STDERR) and translating errors

  if (error instanceof ValidationErrors) {
    const jsonResponse = mapValidationErrorsToResponse({
      errors: error.errors,
      req,
      translator,
    });

    return res.status(UNPROCESSABLE_ENTITY).json(jsonResponse);
  }

  if (error instanceof InvalidCredentialsError) {
    return res.status(UNAUTHORIZED).json({
      message: translations.invalidCredentials(),
    });
  }

  if (error instanceof UnauthorizedError) {
    const message = translations.unauthenticated();

    return res.status(UNAUTHORIZED).json({ message });
  }


  if (error instanceof MissingJwtTokenError) {
    const message = translations.missingJwtToken();

    return res.status(UNAUTHORIZED).json({ message });
  }

  if (error instanceof LockedAccountError) {
    const message = translations.accountLocked();

    return res.status(UNAUTHORIZED).json({ message });
  }

  if (error instanceof MissingJwtTokenExtractorError) {
    const message = translations.missingJwtTokenExtractor();

    return res.status(UNAUTHORIZED).json({ message });
  }

  if (error instanceof ExpiredJwtTokenError) {
    const message = translations.expiredJwtToken();

    return res.status(UNAUTHORIZED).json({ message });
  }

  if (error instanceof InvalidJwtTokenError) {
    const message = translations.invalidJwtToken();

    return res.status(UNAUTHORIZED).json({ message });
  }

  if (error instanceof UnverifiedAccountError) {
    return res.status(UNAUTHORIZED).json({
      message: translations.unverifiedAccount(),
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(FORBIDDEN).json({
      message: translations.forbidden(),
    });
  }

  if (error instanceof ConflictError) {
    const message = translations.conflict(error);

    return res.status(CONFLICT).json({ message });
  }

  if (error instanceof RemindPasswordError) {
    // for security reasons return same response as email would exist in db
    const message = translations.resetPasswordLinkSent();

    return res.status(OK).json({ message });
  }

  if (error instanceof InvalidResetPasswordTokenError) {
    const message = translations.invalidResetPasswordtoken();

    return res.status(UNPROCESSABLE_ENTITY).json({ message });
  }

  if (error instanceof ExpiredResetPasswordTokenError) {
    const message = translations.expiredResetPasswordtoken();

    return res.status(UNPROCESSABLE_ENTITY).json({ message });
  }

  if (error instanceof InvalidVerifyAccountTokenError) {
    const message = translations.invalidVerifyAccountToken();

    return res.status(UNPROCESSABLE_ENTITY).json({ message });
  }

  if (error instanceof ItemNotFoundError) {
    const message = translations.notFound(error);

    return res.status(NOT_FOUND).json({ message });
  }

  if (error instanceof AccountAlreadyVerifiedError) {
    const message = translations.accountAlreadyVerified();

    return res.status(CONFLICT).json({ message });
  }

  {
    const message = translations.serverError();

    // tslint:disable-next-line:no-console
    console.log(message, error, error.message);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message });
  }
  // tslint:disable-next-line:max-file-line-count
};

import { Request, Response } from 'express';
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';
import ValidationErrors from 'rulr/ValidationErrors';
import ExpiredJwtTokenError from '../../../../../utils/errors/auth/ExpiredJwtTokenError';
import InvalidCredentialsError from '../../../../../utils/errors/auth/InvalidCredentialsError';
import InvalidJwtTokenError from '../../../../../utils/errors/auth/InvalidJwtTokenError';
import LockedAccountError from '../../../../../utils/errors/auth/LockedAccountError';
import MissingJwtTokenError from '../../../../../utils/errors/auth/MissingJwtTokenError';
import MissingJwtTokenExtractorError from '../../../../../utils/errors/auth/MissingJwtTokenExtractorError';
import RemindPasswordError from '../../../../../utils/errors/auth/RemindPasswordError';
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

  if (error instanceof UnverifiedAccountError) {
    return res.status(UNAUTHORIZED).json({
      message: translations.unverifiedAccount(),
    });
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

  if (error instanceof ConflictError) {
    const message = translations.conflict(error);

    return res.status(CONFLICT).json({ message });
  }

  if (error instanceof RemindPasswordError) {
    // for security reasons return same response as email would exist in db
    const message = translations.resetPasswordLinkSent();

    return res.status(OK).json({ message });
  }

  {
    const message = translations.serverError();

    // tslint:disable-next-line:no-console
    console.log(message, error, error.message);
    
    res.status(INTERNAL_SERVER_ERROR).json({ message });
  }
  // tslint:disable-next-line:max-file-line-count
};

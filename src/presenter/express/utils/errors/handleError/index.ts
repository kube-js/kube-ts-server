import { Request, Response } from 'express';
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';
import ValidationErrors from 'rulr/ValidationErrors';
import ExpiredJwtTokenError from '../../../../../utils/errors/auth/ExpiredJwtTokenError';
import InvalidCredentialsError from '../../../../../utils/errors/auth/InvalidCredentialsError';
import InvalidJwtTokenError from '../../../../../utils/errors/auth/InvalidJwtTokenError';
import MissingJwtTokenError from '../../../../../utils/errors/auth/MissingJwtTokenError';
import MissingJwtTokenExtractorError from '../../../../../utils/errors/auth/MissingJwtTokenExtractorError';
import UnverifiedAccountError from '../../../../../utils/errors/auth/UnverifiedAccountError';
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

  {
    // tslint:disable-next-line:no-console
    console.log(translations.serverError(), error, error.message);

    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: translations.serverError() });
  }
};

import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } from 'http-status-codes';
import ValidationErrors from 'rulr/ValidationErrors';
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
  // TODO: logging (to STDERR) and translating errors

  if (error instanceof ValidationErrors) {
    const jsonResponse = mapValidationErrorsToResponse({
      errors: error.errors,
      req,
      translator,
    });

    return res.status(UNPROCESSABLE_ENTITY).json(jsonResponse);
  }

  {
    // tslint:disable-next-line:no-console
    console.log('server error', error, error.message);

    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};

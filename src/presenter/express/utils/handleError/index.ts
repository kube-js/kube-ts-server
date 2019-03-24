import { Request, Response } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import ValidationErrors from 'rulr/ValidationErrors';
import Config from '../../presenterFactory/Config';
export interface Options {
  readonly config: Config;
  readonly req: Request;
  readonly res: Response;
  readonly error: any;
}

export default ({ res, error }: Options) => {
  // TODO: grab accept-language header and translate error to that language
  // TODO: logging (to STDERR) and translating errors

  if (error instanceof ValidationErrors) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      message: 'Validation errors',
    });
  }

  {
    // tslint:disable-next-line:no-console
    console.log('server error', error, error.message);

    // res
    //   .status(INTERNAL_SERVER_ERROR)
    //   .json({ message: 'Internal server error' });
  }
};

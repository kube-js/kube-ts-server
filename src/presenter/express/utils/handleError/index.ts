import { Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Config from '../../presenterFactory/Config';

export interface Options {
  readonly config: Config;
  readonly res: Response;
  readonly error: any;
}

export default ({ res, error }: Options): void => {
  // TODO: logging (to STDERR) and translating errors
  {
    // tslint:disable-next-line:no-console
    console.log('server error', error, error.message);

    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error' });
  }
};

import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import Config from '../../../../presenterFactory/Config';

export default (_config: Config) => async (_req: Request, res: Response) => {
  // TODO: implements checks with git-rev
  res.status(OK).json({
    version: '1.0.0',
  });
};

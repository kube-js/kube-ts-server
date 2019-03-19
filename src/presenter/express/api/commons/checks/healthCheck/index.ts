import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import Config from '../../../../presenterFactory/Config';

export type Check = (config: Config) => Promise<any>;

export default (_checks: Check[]) => async (_req: Request, res: Response) => {
  res.status(OK).json({
    status: 'ok',
  });
};

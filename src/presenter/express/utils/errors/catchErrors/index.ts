import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Config from '../../../presenterFactory/Config';
import ExpressHandler from '../../../types/ExpressHandler';
import handleError from '../handleError';

export default (config: Config, handler: ExpressHandler) => async (
  req: Request,
  res: Response
) => {
  try {
    await handler(req, res);
  } catch (error) {
    const transactionId = uuid();
    handleError({ config, req, res, error, transactionId });
  }
};

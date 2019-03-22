import { Request, Response } from 'express';
import Config from '../../presenterFactory/Config';
import ExpressHandler from '../../types/ExpressHandler';
import handleError from '../handleError';

export default (config: Config, handler: ExpressHandler) => async (
  req: Request,
  res: Response
) => {
  try {
    await handler(req, res);
  } catch (error) {
    handleError({ config, req, res, error });
  }
};

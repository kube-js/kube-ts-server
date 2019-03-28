import cors from 'cors';
import { ExpressConfig } from '../../../../config/subconfigs/http';

const createCorsMiddleware = (_config: ExpressConfig) =>
  // TODO: options should come from config
  cors({
    origin: '*',
    preflightContinue: true,
  });

export default createCorsMiddleware;

import { Request, Response } from 'express';
import RateLimit from 'express-rate-limit';
import _F from 'ramda/src/F';
import { ExpressConfig } from '../../../../config/subconfigs/http';

// see https://github.com/nfriedly/express-rate-limit/issues/69
export const createSkipFunction = (skipMethods?: string) => {
  if (skipMethods === undefined) {
    return _F;
  }

  const skippedMethods = skipMethods
    .split(',')
    .map(method => method.toLocaleLowerCase());

  return (req: Request, _res: Response) =>
    skippedMethods.includes(req.method.toLocaleLowerCase());
};

const createRateLimiter = (config: ExpressConfig) => {
  const {
    middlewares: { rateLimiter },
  } = config;
  const skip = createSkipFunction(rateLimiter.skipMethods);

  return new RateLimit({
    max: rateLimiter.maxNumberOfRequest,
    message: rateLimiter.message,
    skip,
    windowMs: rateLimiter.windowMs,
  });
};

export default createRateLimiter;

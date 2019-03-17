import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from 'express';
import helmet from 'helmet';
import Config from './Config';

export default (_config: Config): Router => {
  const router: Router = Router();

  /** TODO: Internationalization
   *  check: https://github.com/mashpie/i18n-node
   */

  /** TODO: Rate limiting
   * check:
   * - https://github.com/nfriedly/express-rate-limit
   * - https://github.com/animir/node-rate-limiter-flexible
   * - https://github.com/AdamPflug/express-brute
   * - https://github.com/ded/express-limiter
   */

  /* CORS */
  const corsMiddleware = cors({
    origin: '*',
    preflightContinue: true,
  });
  router.use(corsMiddleware);

  /* BODY PARSER */
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  /* HELMET */

  router.use(helmet());

  return router;
};

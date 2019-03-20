import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Router } from 'express';
import helmet from 'helmet';
import Config from './Config';

export default ({ express }: Config): Router => {
  const { middlewares } = express;

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
  if (middlewares.cors.enabled) {
    const corsMiddleware = cors({
      origin: '*',
      preflightContinue: true,
    });
    router.use(corsMiddleware);
  }

  /* BODY PARSER */
  if (middlewares.bodyParser.enabled) {
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
  }

  /* HELMET */
  if (middlewares.helmet.enabled) {
    router.use(helmet());
  }

  /* COMPRESSION */
  /* use only when nginx reverse proxy gzip is disabled */
  if (middlewares.compression.enabled) {
    router.use(compression());
  }

  return router;
};

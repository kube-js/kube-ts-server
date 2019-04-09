import * as bodyParser from 'body-parser';
import compression from 'compression';
import { Router } from 'express';
import helmet from 'helmet';
import { HttpConfig } from '../../../config/subconfigs/http';
import { Options as TranslatorOptions } from '../../../translator/default/factory';
import Translation from '../../../translator/default/translations/interfaces';
import contentType from '../middlewares/contentType/factory';
import createCorsMiddleware from '../middlewares/cors/factory';
import createRateLimiter from '../middlewares/rateLimiter/factory';

export interface Options {
  readonly translator: (options: TranslatorOptions) => Translation;
  readonly config: HttpConfig;
}

export default ({ config: { express }, translator }: Options): Router => {
  const { middlewares } = express;

  const router: Router = Router();

  /* RATE LIMITING */
  if (middlewares.rateLimiter.enabled) {
    const rateLimiter = createRateLimiter(express);
    router.use(rateLimiter);
  }

  /* TODO: configure remaining middleware via config */
  /* CORS */
  if (middlewares.cors.enabled) {
    const corsMiddleware = createCorsMiddleware(express);
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

  router.use(contentType({ translator }));

  return router;
};

import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Router } from 'express';
import helmet from 'helmet';
import Config from './Config';

export default (_config: Config): Router => {
  const router: Router = Router();

  /* CORS */
  const corsMiddleware = cors({
    origin: '*',
    preflightContinue: true
  });
  router.use(corsMiddleware);
  
  /* BODY PARSER */
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  /* HELMET */ 
  router.use(helmet());

  return router;
};

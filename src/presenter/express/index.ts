// tslint:disable:no-console
import dotenv from 'dotenv';
import sourceMapSupport from 'source-map-support';
import stoppable from 'stoppable';
sourceMapSupport.install();
import handleUnexpectedEvents from './utils/errors/handleUnexpectedEvents';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import config from '../../config';
import app from './app';

const expressApp: express.Application = express();

if (config.http.express.trustProxy) {
  // see: https://stackoverflow.com/questions/23413401/what-does-trust-proxy-actually-do-in-express-js-and-do-i-need-to-use-it
  expressApp.enable('trust proxy');
}

const { service, logger, presenter } = app({
  auth: config.auth,
  http: config.http,
  logger: config.logger,
  repo: config.repo,
  translator: config.translator,
});

expressApp.all('*', presenter);

const server = stoppable(createServer(expressApp));

/* @credits: https://github.com/banzaicloud/node-service-tools */
handleUnexpectedEvents({ server, service, logger });

server.listen(config.http.express.port, () => {
  console.log(
    `Listening on ${config.http.express.host}:${config.http.express.port}`
  );
});

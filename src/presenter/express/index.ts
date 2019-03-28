import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
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

const { presenter } = app({
  auth: config.auth,
  http: config.http,
  logger: config.logger,
  repo: config.repo,
  translator: config.translator,
});

expressApp.all('*', presenter);

const server = createServer(expressApp);

server.listen(config.http.express.port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `Listening on ${config.http.express.host}:${config.http.express.port}`
  );
});

import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { createServer } from 'http';
import config from '../../config';
import app from './app';

const expressApp: express.Application = express();

expressApp.all(
  '*',
  app({
    auth: config.auth,
    http: config.http,
    logger: config.logger,
    repo: config.repo,
    translator: config.translator,
  })
);

const server = createServer(expressApp);

server.listen(config.http.express.port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    `Listening on ${config.http.express.host}:${config.http.express.port}`
  );
});

import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import express from 'express';
import { createServer } from 'http';
import config from '../../config';
import app from './app';

const expressApp: express.Application = express();

expressApp.all('*', app({}));

/**
 * TODO:
 * - rate limiting
 * - internationalization
 * - logging in distributed way
 * - lowering size of docker image
 */

const server = createServer(expressApp);

server.listen(config.express.port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on ${config.express.host}:${config.express.port}`);
});

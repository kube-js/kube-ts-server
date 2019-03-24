import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import createSupertest from 'supertest';
import config from '../../../../config';
import app from '../../app';

const expressApp: express.Application = express();

const { presenter, service } = app({
  auth: config.auth,
  http: config.http,
  logger: config.logger,
  repo: config.repo,
  translator: config.translator,
});

expressApp.all('*', presenter);

const request = createSupertest(expressApp);

export default () => {
  beforeEach(async () => {
    await service.migrations.rollback();
    await service.migrations.migrate();
  });

  return { service, request };
};

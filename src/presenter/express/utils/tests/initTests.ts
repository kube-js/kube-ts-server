import * as sourceMapSupport from 'source-map-support';
import { SmtpTestServer } from '../tests/smtpServer/index';
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

const mailServer = new SmtpTestServer({
  port: config.repo.mail.nodemailer.port,
  secure: config.repo.mail.nodemailer.secure,
});

export interface Options {
  readonly useMailServer?: boolean;
}

export default ({
  useMailServer = false,
}: Options) => {
  beforeAll(async () => {
    if (useMailServer) {
      await mailServer.start();
    }
  });

  beforeEach(async () => {
    if (useMailServer) {
      mailServer.clear();
    }
    await service.migrations.rollback();
    await service.migrations.migrate();
  });

  afterEach(async () => {
    await service.migrations.rollback();
  });

  afterAll(async () => {
    if (useMailServer) {
      await mailServer.shutdown();
    }
    await service.closeDbConnection();
  });

  const request = createSupertest(expressApp);

  return { service, request, mailServer };
};

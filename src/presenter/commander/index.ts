import { Command } from 'commander';
import dotenv from 'dotenv';
dotenv.config();
import config from '../../config';
import app from './app';

const program = new Command();

app({
  auth: config.auth,
  http: config.http,
  logger: config.logger,
  program,
  repo: config.repo,
  translator: config.translator,
});

program.parse(process.argv);

import auth, { AuthConfig } from './subconfigs/auth';
import http, { HttpConfig } from './subconfigs/http';
import logger, { LoggerConfig } from './subconfigs/logger';
import repo, { RepoConfig } from './subconfigs/repo';
import translator, { TranslatorConfig } from './subconfigs/translator';

export interface Config {
  readonly http: HttpConfig;
  readonly auth: AuthConfig;
  readonly repo: RepoConfig;
  readonly logger: LoggerConfig;
  readonly translator: TranslatorConfig;
}

const config: Config = {
  auth,
  http,
  logger,
  repo,
  translator,
};

export default config;

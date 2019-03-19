import { AuthConfig } from '../../../config/subconfigs/auth';
import { HttpConfig } from '../../../config/subconfigs/http';
import { LoggerConfig } from '../../../config/subconfigs/logger';
import { RepoConfig } from '../../../config/subconfigs/repo';
import { TranslatorConfig } from '../../../config/subconfigs/translator';
export default interface Config {
  readonly logger: LoggerConfig;
  readonly repo: RepoConfig;
  readonly auth: AuthConfig;
  readonly http: HttpConfig;
  readonly translator: TranslatorConfig;
}

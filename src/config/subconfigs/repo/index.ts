import mail, { MailConfig } from './mail';
import model, { ModelConfig } from './model';

export interface RepoConfig {
  readonly model: ModelConfig;
  readonly mail: MailConfig;
}

const config: RepoConfig = {
  mail,
  model,
};

export default config;

import model, { ModelConfig } from './model';

export interface RepoConfig {
  readonly model: ModelConfig;
}

const config: RepoConfig = {
  model,
};

export default config;

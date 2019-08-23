import { ClientConfig } from '../../../../config/subconfigs/http/index';

export interface Options {
  readonly token: string;
  readonly config: ClientConfig;
}

export default ({ token, config }: Options) =>
  `${config.resetPasswordUrl}?${
    config.resetPasswordTokenQueryParamName
  }=${token}`;

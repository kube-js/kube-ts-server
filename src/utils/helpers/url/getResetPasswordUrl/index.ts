import { ClientConfig } from '../../../../config/subconfigs/http/index';

export interface Options {
  readonly token: string;
  readonly email: string;
  readonly config: ClientConfig;
}

export default ({ token, email, config }: Options) =>
  `${config.resetPasswordUrl}?${
    config.resetPasswordTokenQueryParamName
  }=${token}&email=${email}`;

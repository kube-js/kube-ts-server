import { EXPRESS_HOST, EXPRESS_PORT } from './constants';
import getNumberValue from './utils/helpers/getNumberValue';
import getStringValue from './utils/helpers/getStringValue';

export interface ExpressConfig {
  readonly port: number;
  readonly host: string;
}

export interface Config {
  readonly express: ExpressConfig;
}

const config: Config = {
  express: {
    host: getStringValue(process.env.EXPRESS_HOST, EXPRESS_HOST),
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
  },
};

export default config;

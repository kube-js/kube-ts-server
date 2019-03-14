import { EXPRESS_PORT } from './constants';
import getNumberValue from './utils/helpers/getNumberValue';

export interface ExpressConfig {
  readonly port: number;
}

export interface Config {
  readonly express: ExpressConfig;
}

const config: Config = {
  express: {
    port: getNumberValue(process.env.EXPRESS_PORT, EXPRESS_PORT),
  },
};

export default config;

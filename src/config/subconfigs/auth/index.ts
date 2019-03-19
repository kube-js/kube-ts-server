import { JWT_EXPIRES_IN } from "../../../constants";
import getNumberValue from "../../../utils/helpers/getNumberValue";
import getStringValue from "../../../utils/helpers/getStringValue";

export interface JwtConfig {
  readonly algoritm: string;
  readonly expiresIn: number;
  readonly secret?: string;
}

export interface AuthConfig {
  readonly jwt: JwtConfig;
};

const config: AuthConfig = {
  jwt: {
    algoritm: getStringValue(process.env.JWT_ALGORITM, 'HS256'),
    expiresIn: getNumberValue(process.env.JWT_EXPIRES_IN, JWT_EXPIRES_IN),
    secret: process.env.JWT_SECRET, // intentional - do not change as exception is thrown if not set
  }
}

export default config; 

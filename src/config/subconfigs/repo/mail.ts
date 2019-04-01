import {
  MAIL_PORT,
  MAIL_REPO_TYPE,
  SMTP_API_KEY,
  SMTP_DOMAIN,
  SMTP_FROM,
  SMTP_HOST,
  SMTP_IGNORE_TLS,
  SMTP_PASS,
  SMTP_REQUIRE_TLS,
  SMTP_SECURE,
  SMTP_SERVICE,
  SMTP_TO,
  SMTP_USER,
} from '../../../constants';
import getBooleanValue from '../../../utils/helpers/config/getBooleanValue';
import getNumberValue from '../../../utils/helpers/config/getNumberValue';
import getStringValue from '../../../utils/helpers/config/getStringValue';

export interface NodeMailerConfig {
  readonly apiKey: string;
  readonly domain: string;
  readonly host: string;
  readonly ignoreTLS: boolean;
  readonly pass: string;
  readonly port: number;
  readonly requireTLS: boolean;
  readonly secure: boolean;
  readonly service: string;
  readonly user: string;
}

export interface MailConfig {
  readonly nodemailer: NodeMailerConfig;
  readonly type: string;
  readonly from: string;
  readonly to: string;
}

const config: MailConfig = {
  from: getStringValue(process.env.SMTP_FROM, SMTP_FROM),
  nodemailer: {
    apiKey: getStringValue(process.env.SMTP_API_KEY, SMTP_API_KEY),
    domain: getStringValue(process.env.SMTP_DOMAIN, SMTP_DOMAIN),
    host: getStringValue(process.env.SMTP_HOST, SMTP_HOST),
    ignoreTLS: getBooleanValue(process.env.SMTP_IGNORE_TLS, SMTP_IGNORE_TLS),
    pass: getStringValue(process.env.SMTP_PASS, SMTP_PASS),
    port: getNumberValue(process.env.MAIL_PORT, MAIL_PORT),
    requireTLS: getBooleanValue(process.env.SMTP_REQUIRE_TLS, SMTP_REQUIRE_TLS),
    secure: getBooleanValue(process.env.SMTP_SECURE, SMTP_SECURE),
    service: getStringValue(process.env.SMTP_SERVICE, SMTP_SERVICE),
    user: getStringValue(process.env.SMTP_USER, SMTP_USER),
  },
  to: getStringValue(process.env.SMTP_TO, SMTP_TO),
  type: getStringValue(process.env.MAIL_REPO_TYPE, MAIL_REPO_TYPE),
};

export default config;

import { Transporter } from 'nodemailer';
import isString from '../../../../../utils/helpers/commons/isString';

export interface BaseOptions {
  readonly from: string;
  readonly cc?: string | string[];
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
}

export interface Options extends BaseOptions {
  readonly to: string | string[];
}

export interface Config {
  readonly mailer: Transporter;
}

export default ({ mailer }: Config) => async ({
  cc,
  from,
  html,
  to,
  subject,
  text,
}: Options) => {
  const ccData = isString(cc) ? { cc } : {};
  const textData = isString(text) ? { text } : {};

  return mailer.sendMail({
    from,
    html,
    subject,
    to,
    ...textData,
    ...ccData,
  });
};

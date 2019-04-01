import { Transporter } from 'nodemailer';

export interface Options {
  readonly from: string;
  readonly cc?: string | string[];
  readonly to: string | string[];
  readonly subject: string;
  readonly html: string;
  readonly text?: string;
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
  const ccData = cc !== undefined ? { cc } : {};
  const textData = text !== undefined ? { text } : {};

  return mailer.sendMail({
    from,
    html,
    subject,
    to,
    ...textData,
    ...ccData,
  });
};

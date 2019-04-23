import { createTransport } from 'nodemailer';
import { NodeMailerConfig } from '../../../config/subconfigs/repo/mail';
import sendEmail from './functions/sendEmail';

const createMailer = ({
  user,
  pass,
  domain,
  api_key,
  host,
  smtpTestHost,
  ...otherOptions
}: NodeMailerConfig) => {
  const smtpHost = process.env.NODE_ENV === 'test' ? smtpTestHost : host;
  
  return createTransport({
    auth: {
      api_key,
      domain,
      pass,
      user,
    },
    host: smtpHost,
    ...otherOptions,
  });
};

export default (config: NodeMailerConfig) => {
  const mailer = createMailer(config);

  return {
    sendEmail: sendEmail({ mailer }),
  };
};

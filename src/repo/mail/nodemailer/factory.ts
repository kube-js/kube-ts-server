import { createTransport } from 'nodemailer';
import { NodeMailerConfig } from '../../../config/subconfigs/repo/mail';
import sendEmail from './functions/sendEmail';

const createMailer = ({
  user,
  pass,
  domain,
  api_key,
  ...otherOptions
}: NodeMailerConfig) =>
  createTransport({
    auth: {
      api_key,
      domain,
      pass,
      user,
    },
    ...otherOptions,
  });

export default (config: NodeMailerConfig) => {
  const mailer = createMailer(config);

  return {
    sendEmail: sendEmail({ mailer }),
  };
};

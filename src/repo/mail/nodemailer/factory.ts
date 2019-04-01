import { createTransport } from 'nodemailer';
import { NodeMailerConfig } from '../../../config/subconfigs/repo/mail';
import sendEmail from './functions/sendEmail';

const createMailer = (config: NodeMailerConfig) =>
  createTransport({
    auth: {
      pass: config.pass,
      user: config.user,
    },
    ignoreTLS: config.ignoreTLS,
    port: config.port,
    requireTLS: config.requireTLS,
    secure: config.secure,
    service: config.service,
  });

export default (config: NodeMailerConfig) => {
  const mailer = createMailer(config);

  return {
    sendEmail: sendEmail({ mailer }),
  };
};

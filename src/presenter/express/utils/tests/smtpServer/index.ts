/**
 * @author: normartin https://github.com/normartin
 * @source: https://github.com/normartin/ts-smtp-test
 * @copied from: https://github.com/normartin/ts-smtp-test/blob/master/src/smtp-test-server.ts
 */

import { ParsedMail, simpleParser } from 'mailparser';
import _T from 'ramda/src/T';
import {
  SMTPServer,
  SMTPServerAuthentication,
  SMTPServerAuthenticationResponse,
  SMTPServerSession,
} from 'smtp-server';
import { Readable } from 'stream';
import { Mail } from './mail';

function authFunction(
  config: SmtpServerConfig
): (
  auth: SMTPServerAuthentication,
  session: SMTPServerSession,
  callback: (
    err: Error | null | undefined,
    response: SMTPServerAuthenticationResponse
  ) => void
) => void {
  return (auth, _session, callback) => {
    /* istanbul ignore next */
    if (
      config.authentication !== undefined &&
      auth.username !== undefined &&
      auth.password !== undefined &&
      config.authentication(auth.username, auth.password)
    ) {
      callback(undefined, { user: auth.username });
    } else {
      callback(new Error('Invalid username or password'), { user: null });
    }
  };
}

export interface SmtpServerConfig {
  port?: number;
  secure?: boolean;
  authentication?: (user: string, passwd: string) => boolean;
  host?: string;
  hideSTARTTLS?: boolean;
}

const defaultOptions: SmtpServerConfig = {
  authentication: () => true,
  hideSTARTTLS: true,
  host: 'localhost',
  port: 2025,
  secure: false,
};

export class SmtpTestServer {
  public config: SmtpServerConfig;
  public messages: Mail[] = [];
  public server: SMTPServer;

  constructor(serverConfig?: SmtpServerConfig) {
    this.config = { ...defaultOptions, ...serverConfig };

    this.server = new SMTPServer({
      hideSTARTTLS: this.config.hideSTARTTLS,
      onAuth: authFunction(this.config),
      onData: dataFunction(mail => this.messages.push(new Mail(mail))),
      secure: this.config.secure,
    });
  }

  public async start(): Promise<SmtpTestServer> {
    return new Promise<SmtpTestServer>(resolve => {
      this.server.listen(this.config.port, this.config.host, () => {
        resolve(this);
      });
    });
  }

  public clear() {
    this.messages = [];
  }

  public async shutdown(): Promise<void> {
    return new Promise<void>(resolve => {
      this.server.close(resolve);
    });
  }
}

function dataFunction(
  messageCB: (mail: ParsedMail) => void
): (
  stream: Readable,
  session: SMTPServerSession,
  callback: (err?: Error | null) => void
) => void {
  return (stream, _session, callback) => {
    simpleParser(stream, (err, mail) => {
      messageCB(mail);
      callback(err);
    });
  };
  // tslint:disable-next-line:max-file-line-count
}

/**
 * @author: normartin https://github.com/normartin
 * @source: https://github.com/normartin/ts-smtp-test
 * @copied from: https://github.com/normartin/ts-smtp-test/blob/master/src/mail.ts
 */

import { ParsedMail } from 'mailparser';

export class Mail {
  private readonly mail: ParsedMail;

  constructor(mail: ParsedMail) {
    this.mail = mail;
  }

  public get from(): string {
    return this.mail.from.text;
  }

  public get to(): string {
    return this.mail.to.text;
  }

  public get subject(): string {
    return this.mail.subject;
  }

  public get textContent(): string {
    return this.mail.text;
  }

  public get htmlContent(): string | boolean | undefined {
    return this.mail.html;
  }
}

export default interface Emails {
  readonly verifyYourEmailHtml: (link: string) => string;
  readonly verifyYourEmailSubject: () => string;
  readonly verifyYourEmailText: (link: string) => string;
  readonly resetPasswordHtml: (link: string) => string;
  readonly resetPasswordSubject: () => string;
  readonly resetPasswordText: (link: string) => string;
}

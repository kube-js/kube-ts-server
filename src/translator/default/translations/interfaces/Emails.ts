export default interface Emails {
  readonly verifyYourEmailHtml: (link: string) => string;
  readonly verifyYourEmailSubject: () => string;
  readonly verifyYourEmailText: (link: string) => string;
}

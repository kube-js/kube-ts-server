export default interface Emails {
  readonly verifyYourEmailHtml: (link: string) => string;
  readonly verifyYourEmailSubject: () => string;
  readonly verifyYourEmailText: (link: string) => string;
  readonly remindPasswordHtml: (link: string) => string;
  readonly remindPasswordSubject: () => string;
  readonly remindPasswordText: (link: string) => string;
  readonly resetPasswordHtml: () => string;
  readonly resetPasswordSubject: () => string;
  readonly resetPasswordText: () => string;
}

export default interface Responses {
  readonly passwordChangedSuccessfully: () => string;
  readonly resetPasswordLinkSent: () => string;
}

export default interface Responses {
  readonly passwordChangedSuccessfully: () => string;
  readonly accountVerifiedSuccessfully: () => string;
  readonly resetPasswordLinkSent: () => string;
}

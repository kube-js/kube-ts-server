export default interface Responses {
  readonly created: () => string;
  readonly passwordChangedSuccessfully: () => string;
  readonly accountVerifiedSuccessfully: () => string;
  readonly resetPasswordLinkSent: () => string;
}

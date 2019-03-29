export default interface ErrorsTranslations {
  readonly accountLocked: () => string;
  readonly expiredJwtToken: () => string;
  readonly invalidJwtToken: () => string;
  readonly missingJwtToken: () => string;
  readonly missingJwtTokenExtractor: () => string;
  readonly unauthorized: () => string;
  readonly forbidden: () => string;
  readonly serverError: () => string;
  readonly invalidCredentials: () => string;
  readonly unverifiedAccount: () => string;
}

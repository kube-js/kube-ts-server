import { ItemNotFoundError } from "@js-items/foundation";
import ConflictError from "../../../../utils/errors/http/ConflictError";

export default interface ErrorsTranslations {
  readonly accountLocked: () => string;
  readonly verifyFunctionalityLocked: () => string;
  readonly verifyTokenSent: () => string;
  readonly conflict: (error: ConflictError) => string;
  readonly expiredJwtToken: () => string;
  readonly invalidJwtToken: () => string;
  readonly invalidResetPasswordtoken: () => string;
  readonly invalidVerifyAccountToken: () => string;
  readonly accountAlreadyVerified: () => string;
  readonly expiredResetPasswordtoken: () => string;
  readonly missingJwtToken: () => string;
  readonly missingJwtTokenExtractor: () => string;
  readonly unauthenticated: () => string;
  readonly forbidden: () => string;
  readonly serverError: () => string;
  readonly invalidCredentials: () => string;
  readonly unverifiedAccount: () => string;
  readonly unsupportedMediaType: () => string;
  readonly notFound: () => string;
  readonly serviceIsUnavailable: () => string;
  readonly itemNotFound: (error: ItemNotFoundError) => string;
}

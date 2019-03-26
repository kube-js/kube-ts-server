import { ValidationErrorsTranslations } from './ValidationErrorsTranslations';

export default interface Translation extends ValidationErrorsTranslations {
  readonly validationFailed: () => string;
}

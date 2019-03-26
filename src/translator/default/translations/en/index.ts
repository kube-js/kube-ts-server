import Translation from '../Translation';
import validation from './subtranslations/validation';
import validationErrorsTranslations from './subtranslations/validationsErrorsTranslations';

const en: Translation = {
  ...validation,
  ...validationErrorsTranslations,
};

export default en;

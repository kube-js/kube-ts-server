import Translation from '../Translation';
import validation from './subtranslations/validation';
import validationErrorsTranslations from './subtranslations/validationsErrorsTranslations';

const pl: Translation = {
  ...validation,
  ...validationErrorsTranslations,
};

export default pl;

import Translation from '../interfaces';
import emails from './subtranslations/emails';
import errors from './subtranslations/errors';
import responsesTranslations from './subtranslations/responses';
import validation from './subtranslations/validation';

const pl: Translation = {
  ...validation,
  ...errors,
  ...emails,
  ...responsesTranslations,
};

export default pl;

import Translation from '../interfaces';
import emails from './subtranslations/emails';
import errors from './subtranslations/errors';
import validation from './subtranslations/validation';

const en: Translation = {
  ...validation,
  ...errors,
  ...emails,
};

export default en;

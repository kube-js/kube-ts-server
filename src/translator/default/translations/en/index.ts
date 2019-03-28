import Translation from '../interfaces';
import errors from './subtranslations/errors';
import validation from './subtranslations/validation';

const en: Translation = {
  ...validation,
  ...errors,
};

export default en;

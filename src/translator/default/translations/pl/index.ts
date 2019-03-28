import Translation from '../interfaces';
import errors from './subtranslations/errors';
import validation from './subtranslations/validation';

const pl: Translation = {
  ...validation,
  ...errors,
};

export default pl;

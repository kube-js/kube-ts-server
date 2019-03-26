import { Request } from 'express';
import ValidationError from 'rulr/ValidationError';
import translatorFactory from '../../../../../translator/factory';
import translateValidationError from '../translateValidationError';

export interface Options {
  req: Request;
  translator: ReturnType<typeof translatorFactory>;
  errors: ValidationError[];
}

const mapValidationErrorsToResponse = ({
  errors,
  req,
  translator,
}: Options) => {
  const translation = translator({ req });

  return {
    errors: errors.map(error => ({
      field: error.getPath(),
      message: translateValidationError({ translation, error }),
    })),
    message: translation.validationFailed(),
  };
};

export default mapValidationErrorsToResponse;

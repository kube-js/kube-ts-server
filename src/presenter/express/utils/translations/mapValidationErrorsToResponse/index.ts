import { Request } from 'express';
import ValidationError from 'rulr/ValidationError';
import translatorFactory from '../../../../../translator/factory';

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
  const translations = translator({ req });

  return {
    errors: errors.map(error => ({
      field: error.getPath(),
      // TODO: map to translated error
      message: error.getPath(),
    })),
    message: translations.validationFailed(),
  };
};

export default mapValidationErrorsToResponse;

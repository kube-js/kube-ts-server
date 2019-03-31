import { Request } from 'express';
import ValidationError from 'rulr/ValidationError';
import translatorFactory from '../../../../../translator/factory';
import MatchValidationError from '../../../../../utils/errors/validation/MatchValidationError';
import translateValidationError from '../translateValidationError';

export interface Options {
  req: Request;
  translator: ReturnType<typeof translatorFactory>;
  errors: ValidationError[];
}

export const getFieldsProperties = (error: ValidationError) => {
  if (error instanceof MatchValidationError) {
    return {
      fields: [error.fieldOne, error.fieldTwo],
    };
  }

  return {
    field: error.getPath(),
  };
};

const mapValidationErrorsToResponse = ({
  errors,
  req,
  translator,
}: Options) => {
  const translation = translator({ req });

  return {
    errors: errors.map(error => ({
      ...getFieldsProperties(error),
      message: translateValidationError({ translation, error }),
    })),
    message: translation.validationFailed(),
  };
};

export default mapValidationErrorsToResponse;

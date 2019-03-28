import moment from 'moment';
import _isNil from 'ramda/src/isNil';
import baseConverter, { Options } from './basicConverter';

export const toDate =  (value: any) => !_isNil(value) && moment(value).isValid() ? moment(value).toDate() : null;

const basicToDocumentConverter = ({
  converter,
  useConverter,
  item,
  propertyName,
}: Options) => {
  const convertedCreatedAt = baseConverter({
    converter: toDate,
    item,
    propertyName: 'createdAt',
    useConverter: true,
  });

  const convertedUpdatedAt = baseConverter({
    converter: toDate,
    item: convertedCreatedAt,
    propertyName: 'updatedAt',
    useConverter: true,
  });

  return baseConverter({
    converter,
    item: convertedUpdatedAt,
    propertyName,
    useConverter,
  });
};

export default basicToDocumentConverter;

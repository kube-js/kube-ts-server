import _isNil from 'ramda/src/isNil';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';
import _T from 'ramda/src/T';

export type Converter<T> = (propertyValue: T | T[keyof T]) => any;

export type ConvertersMap<T> = { [Z in keyof T]?: undefined | Converter<T> };

export interface Options<T> {
  readonly convertersMap: ConvertersMap<T>;
  readonly obj: { [Z in keyof T]: any };
}

export default <T>({ obj, convertersMap = {} }: Options<T>) =>
  Object.keys(obj).reduce((acc, keyName) => {
    const converter = convertersMap[keyName as keyof T];
    const value = obj[keyName as keyof T];
    const newValue = _isNil(converter) ? value : converter(value);

    return { ...acc, [keyName]: newValue };
  }, {});

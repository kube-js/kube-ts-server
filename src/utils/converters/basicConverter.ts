import _isPlainObject from 'is-plain-object';
import _mapObjIndexed from 'ramda/src/mapObjIndexed';
// @credits: @ryansmith94
// @source: https://github.com/js-entity-repos/core/blob/master/src/utils/convertPropertyFilter/index.ts

export interface Options {
  readonly propertyName: string;
  readonly converter: (propertyValue: any) => any;
  readonly item: any;
  readonly useConverter?: boolean;
}

const baseConverter = ({
  converter,
  item,
  propertyName,
  useConverter = true,
}: Options): any => {
  if (Array.isArray(item)) {
    return item.map(subItem =>
      baseConverter({
        converter,
        item: subItem,
        propertyName,
      })
    );
  }

  if (_isPlainObject(item)) {
    return _mapObjIndexed((subItem, key) => {
      if (key !== propertyName) {
        return baseConverter({
          converter,
          item: subItem,
          propertyName,
          useConverter: false,
        });
      }

      return baseConverter({
        converter,
        item: subItem,
        propertyName,
      });
    }, item);
  }

  if (!useConverter) {
    return item;
  }

  return converter(item);
};

export default baseConverter;

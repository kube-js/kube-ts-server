import { defaultTo } from 'ramda';

export default (value: any, defaultValue = ''): string =>
  String(defaultTo(defaultValue)(value));

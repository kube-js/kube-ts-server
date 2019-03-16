import { defaultTo } from 'ramda';

export default (value: any, defaultValue: string): string =>
  defaultTo(defaultValue)(value);

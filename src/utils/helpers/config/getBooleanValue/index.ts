import boolean from 'boolean';
import { defaultTo } from 'ramda';

export default (value: any, defaultValue: boolean): boolean =>
  boolean(defaultTo(defaultValue)(value));

import { defaultTo } from 'ramda';

export default (value: any, defaultValue: number): number =>
  defaultTo(defaultValue)(Number(value));

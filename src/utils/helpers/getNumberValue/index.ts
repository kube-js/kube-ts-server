import { defaultTo } from 'ramda';

export default (value: any, defaultValue: number): number =>
  Number(defaultTo(defaultValue)(value));

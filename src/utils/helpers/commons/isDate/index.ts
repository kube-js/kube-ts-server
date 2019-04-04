import moment from 'moment';
import { DEFAULT_DATE_FORMATS } from '../../../../constants';

export interface Options {
  readonly value: any;
  readonly expectedFormats?: string[];
  readonly strict?: boolean;
}

export default ({
  value,
  expectedFormats = DEFAULT_DATE_FORMATS,
  strict = true,
}: Options): boolean => moment(value, expectedFormats, strict).isValid();

import { Item } from '@js-items/foundation';
import recursiveConverter, { ConvertersMap } from './index';

interface MyItem extends Item {
  readonly id: string;
  readonly dateType?: Date | null;
  readonly numberType?: number | null;
  readonly stringType?: string | null;
}

interface Document {
  readonly id: string;
  readonly dateType?: Date | null;
  readonly numberType?: number | null;
  readonly stringType?: string | null;
}

describe('@recursiveConverter', () => {
  const convertersMap: ConvertersMap<MyItem> = {
    dateType: val => (val !== undefined ? val : null),
    numberType: val => (val === undefined ? 0 : val),
    stringType: val => (val === undefined ? null : 'zebra'),
  };

  it('replaced old values using converter for each key when values are undefined', () => {
    const objectToBeUpdated: MyItem = {
      dateType: undefined,
      id: 'abc',
      numberType: undefined,
      stringType: undefined,
    };

    const updatedObject = recursiveConverter<Item>({
      convertersMap,
      obj: objectToBeUpdated,
    });

    const expectedResults: Document = {
      dateType: null,
      id: 'abc',
      numberType: 0,
      stringType: null,
    };

    expect(updatedObject).toEqual(expectedResults);
  });

  it('replaced old values using converter for each key when values are not undefined', () => {
    const testDate = new Date();

    const objectToBeUpdated: MyItem = {
      dateType: testDate,
      id: 'abc',
      numberType: 17,
      stringType: 'demo',
    };

    const updatedObject = recursiveConverter<Item>({
      convertersMap,
      obj: objectToBeUpdated,
    });

    const expectedResults: Document = {
      dateType: testDate,
      id: 'abc',
      numberType: 17,
      stringType: 'zebra',
    };

    expect(updatedObject).toEqual(expectedResults);
  });
});

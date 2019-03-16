import getStringValue from './index';

describe('getStringValue', () => {
  const defaultValue = 'slon';

  it('gets string value when string value provided', () => {
    const expectedValue = 'zebra';

    expect(getStringValue('zebra', defaultValue)).toEqual(expectedValue);
  });

  it('gets default value when undefined provided', () => {
    const expectedValue = 'slon';

    expect(getStringValue(undefined, defaultValue)).toEqual(expectedValue);
  });

  it('gets default value when null provided', () => {
    const expectedValue = 'slon';

    expect(getStringValue(null, defaultValue)).toEqual(expectedValue);
  });
});

import getNumberValue from './index';

describe('getNumberValue', () => {
  it('gets number value when numeric value provided', () => {
    const defaultValue = 15;
    const expectedValue = 12;

    expect(getNumberValue('12', defaultValue)).toEqual(expectedValue);
  });

  it('gets number value when non numeric value provided', () => {
    const defaultValue = 15;
    const expectedValue = 15;
    
    expect(getNumberValue(undefined, defaultValue)).toEqual(expectedValue);
  });

  it('gets number value when zero provided', () => {
    const defaultValue = 15;
    const expectedValue = 0;
    
    expect(getNumberValue(0, defaultValue)).toEqual(expectedValue);
  });
});

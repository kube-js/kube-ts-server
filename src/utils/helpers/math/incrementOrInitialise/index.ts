import _isNil from 'ramda/src/isNil';

type Input = undefined | null | number;

interface Options {
  readonly incrementBy: number;
  readonly initialValue: 0;
}

export default (
  input: Input,
  { initialValue, incrementBy }: Options = { initialValue: 0, incrementBy: 1 }
): number => (_isNil(input) ? initialValue : input + incrementBy);

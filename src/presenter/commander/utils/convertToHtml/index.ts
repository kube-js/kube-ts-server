import _isEmpty from 'ramda/src/isEmpty';
import _isNil from 'ramda/src/isNil';

export interface Options {
  readonly text: string;
  readonly delimiter?: string;
  readonly elementTag?: string;
  readonly parentElement?: string;
}

const convertToHtml = ({
  text = '',
  delimiter = '.',
  elementTag = 'p',
  parentElement,
}: Options) => {
  if (_isNil(text) || _isEmpty(text)) {
    return '';
  }

  const elements = text
    .split(delimiter)
    .map(textLine => `<${elementTag}>${textLine}</${elementTag}>`);

  return parentElement !== undefined
    ? `<${parentElement}>${elements.join('')}</${parentElement}>`
    : elements.join('');
};

export default convertToHtml;

import convertToHtml from './index';

describe('convertToHtml', () => {
  it('returns empty string when no options passed', () => {
    const result = convertToHtml({ text: '' });

    expect(result).toBe('');
  });

  it('returns html elements for the list', () => {
    const result = convertToHtml({
      elementTag: 'li',
      parentElement: 'ul',
      text: 'This is first element. This is second element.',
    });

    expect(result).toBe('<ul><li>This is first element</li><li> This is second element</li><li></li></ul>');
  });

  it('returns html elements for list of paragraphs', () => {
    const result = convertToHtml({
      parentElement: 'div',
      text: 'This is first paragraph. This is second paragraph.',
    });

    expect(result).toBe('<div><p>This is first paragraph</p><p> This is second paragraph</p><p></p></div>');
  });
});

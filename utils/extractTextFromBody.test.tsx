import { extractTextFromBody } from './extractTextFromBody';

describe('extractTextFromBody', () => {
  it('keeps inline code in backticks', () => {
    const body = {
      type: 'root',
      children: [
        {
          type: 'p',
          children: [
            { type: 'text', text: 'Render it with' },
            { type: 'text', text: '<TinaMarkdown>', code: true },
          ],
        },
      ],
    };

    expect(extractTextFromBody(body)).toEqual(
      'Render it with `<TinaMarkdown>`',
    );
  });
});

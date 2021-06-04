import { stripMarkdown } from './blog_helpers'

describe('stripMarkdown', () => {
  describe('with shortcodes', () => {
    const testDocument =
      'Hello, {{ WarningCallout text="Tina Cloud is too cool for you" }}World!\n'
    const expected = 'Hello, World!\n'

    it('should remove shortcode markup', async () => {
      const stripped = await stripMarkdown(testDocument)
      expect(stripped).toEqual(expected)
    })
  })
})

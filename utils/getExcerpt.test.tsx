import { getExcerpt } from "./getExcerpt"



describe('getExcerpt', () => {

  describe('when the text is short', () => {
    const body = {
      type: 'root',
      children: [
        { type: 'p', children: [{ type: 'text', text: 'This is a paragraph.' }] },
        { type: 'h1', children: [{ type: 'text', text: 'Header 1' }] },
        { type: 'h2', children: [{ type: 'text', text: 'Header 2' }] }
      ]
    }

    it('returns the text', () => {
      const text = 'This is a short text'
      expect(getExcerpt(body, 300)).toEqual('This is a paragraph.')
    })
  })

  describe('when the text is long', () => {
    const body = {
      type: 'root',
      children: [
        { type: 'p', children: [{ type: 'text', text: 'Heres some text:' }] },
        { type: 'h1', children: [{ type: 'text', text: 'Header 1' }] },
        { type: 'h2', children: [{ type: 'text', text: 'Header 2' }] },
        { type: 'p', children: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }] },
      ]
    }

    it('returns the truncated text', () => {
      const text = 'This is a short text'
      expect(getExcerpt(body, 100)).toEqual('Heres some text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci...')
    })
  })
})

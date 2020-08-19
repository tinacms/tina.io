import { stripMarkdownLinks } from './getTocContent'

test('should return original string since there is no link', () => {
  expect(stripMarkdownLinks('test')).toEqual('test')
})

test('should remove the link and only show the link\'s text', () => {
  expect(stripMarkdownLinks('[this is a test](http://test.com)')).toEqual('this is a test')
})

test('should remove both links and show their respective texts', () => {
  expect(stripMarkdownLinks('[this is a test](http://test.com) and [another test](http://anothertest.com)')).toEqual('this is a test and another test')
})
//used to create Next links to actual page layout path

export const DOCS_PATH = '/docs/[...slug]'
export const BLOG_INDEX_PATH = '/blog/page/[page_index]'
export const BLOG_PATH = '/blog/[slug]'

export function getDynamicPath(url: string) {
  const docsPattern = new RegExp('(.)?/docs/(.)+')
  if (docsPattern.test(url)) {
    return '/docs/[...slug]'
  }

  const blogIndexPattern = new RegExp('(.)?/blog/page/[0-9]+')
  if (blogIndexPattern.test(url)) {
    return '/blog/page/[page_index]'
  }

  const blogPattern = new RegExp('(.)?/blog/(.)+')
  if (blogPattern.test(url)) {
    return '/blog/[slug]'
  }

  return url
}

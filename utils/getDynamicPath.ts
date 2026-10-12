//used to create Next links to actual page layout path

export const BLOG_INDEX_PATH = '/blog/page/[page_index]';
export const BLOG_PATH = '/blog/[slug]';

const blogIndexPattern = /(.)?\/blog\/page\/[0-9]+/;
const blogPattern = /(.)?\/blog\/(.)+/;
const packagePattern = /(.)?\/packages\/(.)+/;

export function getDynamicPath(url: string) {
  if (blogIndexPattern.test(url)) {
    return '/blog/page/[page_index]';
  }

  if (blogPattern.test(url)) {
    return '/blog/[slug]';
  }
  if (packagePattern.test(url)) {
    return '/packages/[slug]';
  }

  return url;
}

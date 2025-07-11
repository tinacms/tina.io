import { SupportedLocales } from '../middleware';
import { client } from '../tina/__generated__/client';

export type PageType = 'pages' | 'docs' | 'blog' | 'whats-new';

export async function hasChineseVersion(
  pageType: PageType,
  currentPath: string,
): Promise<boolean> {
  let normalizedPath = currentPath;
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }

  const localeRegex = new RegExp(
    `^(${Object.values(SupportedLocales).join('|')})/`,
  );
  const match = normalizedPath.match(localeRegex);

  if (match) {
    const locale = match[1];
    return locale === SupportedLocales.ZH;
  }

  switch (pageType) {
    case 'pages':
      return checkPagesChineseVersion(normalizedPath);
    case 'docs':
      return checkDocsChineseVersion(normalizedPath);
    case 'blog':
      return checkBlogChineseVersion(normalizedPath);
    case 'whats-new':
      return checkWhatsNewChineseVersion(normalizedPath);
    default:
      return false;
  }
}

async function checkPagesChineseVersion(
  normalizedPath: string,
): Promise<boolean> {
  try {
    var zhPath = normalizedPath === '' ? 'home' : normalizedPath;
    const res = await client.queries.pageWithRecentPosts({
      relativePath: `zh/${zhPath}.json`,
    });
    return !!res.data.page;
  } catch (error) {
    return false;
  }
}

async function checkDocsChineseVersion(
  normalizedPath: string,
): Promise<boolean> {
  try {
    var zhPath = normalizedPath.replace(/^docs\//, '');
    if (zhPath === 'docs') {
      zhPath = 'index';
    }
    const res = await client.queries.docZh({
      relativePath: `${zhPath}.mdx`,
    });
    return !!res.data.docZh;
  } catch (error) {
    return false;
  }
}

async function checkBlogChineseVersion(
  normalizedPath: string,
): Promise<boolean> {
  try {
    const zhPath = normalizedPath.replace(/^blog\//, '');
    if (zhPath === 'blog' || /^page\/\d+$/.test(zhPath)) {
      return true;
    }
    const res = await client.queries.postZh({
      relativePath: `${zhPath}.mdx`,
    });
    return !!res.data.postZh;
  } catch (error) {
    return false;
  }
}

async function checkWhatsNewChineseVersion(
  normalizedPath: string,
): Promise<boolean> {
  return false;
}

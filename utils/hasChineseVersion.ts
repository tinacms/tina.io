import { SupportedLocales } from '../middleware';
import { client } from '../tina/__generated__/client';

type PageType = 'normal' | 'docs' | 'blog' | 'whats-new';

export default async function hasChineseVersion(
  pageType: PageType,
  currentPath: string
): Promise<boolean> {
  let normalizedPath = currentPath;
  if (normalizedPath.startsWith('/')) {
    normalizedPath = normalizedPath.substring(1);
  }

  const localeRegex = new RegExp(
    `^(${Object.values(SupportedLocales).join('|')})/`
  );
  const match = normalizedPath.match(localeRegex);

  if (match) {
    const locale = match[1];
    return locale === SupportedLocales.ZH;
  }

  switch (pageType) {
    case 'normal':
      return checkNormalPageChineseVersion(normalizedPath);
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

async function checkNormalPageChineseVersion(
  normalizedPath: string
): Promise<boolean> {
  try {
    const res = await client.queries.pageWithRecentPosts({
      relativePath: `zh/${normalizedPath}.json`,
    });
    return !!res.data.page;
  } catch (error) {
    return false;
  }
}

async function checkDocsChineseVersion(
  normalizedPath: string
): Promise<boolean> {
  try {
    console.log('normalizedPath', normalizedPath);
    var zhPath = normalizedPath.replace(/^docs\//, '');
    console.log('zhPath', zhPath);
    if (zhPath === 'docs') {
      zhPath = 'index';
    }
    console.log('zhPath', zhPath);
    const res = await client.queries.docZh({
      relativePath: `${zhPath}.mdx`,
    });
    return !!res.data.docZh;
  } catch (error) {
    return false;
  }
}

async function checkBlogChineseVersion(
  normalizedPath: string
): Promise<boolean> {
  return false;
}

async function checkWhatsNewChineseVersion(
  normalizedPath: string
): Promise<boolean> {
  return false;
}

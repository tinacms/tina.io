import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import type { Locale } from 'utils/i18n/localeRouteConfig';

export async function getDocsLayoutNav(locale: Locale) {
  const lang = locale === 'zh' ? 'zh' : undefined; // English passes undefined today
  const [navDocData, navLearnData] = await Promise.all([
    getDocsNav(false, null, lang),
    getLearnNav(false, null, lang),
  ]);
  return { navDocData, navLearnData };
}

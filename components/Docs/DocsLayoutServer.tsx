import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import type { Locale } from 'utils/i18n/localeRouteConfig';
import DocsLayoutClient from './DocsLayoutClient';

export default async function DocsLayoutServer({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const lang = locale === 'zh' ? 'zh' : undefined; // English passes undefined today
  const [navDocData, navLearnData] = await Promise.all([
    getDocsNav(false, null, lang),
    getLearnNav(false, null, lang),
  ]);

  return (
    <DocsLayoutClient
      NavigationDocsData={navDocData}
      NavigationLearnData={navLearnData}
    >
      {children}
    </DocsLayoutClient>
  );
}

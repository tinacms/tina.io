import { getDocsNav, getLearnNav } from 'utils/docs/getDocProps';
import DocsLayoutClient from './toc-layout-client';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch navigation data that will be shared across all docs pages
  const [navDocData, navLearnData] = await Promise.all([
    getDocsNav(),
    getLearnNav(),
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

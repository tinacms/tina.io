import DocsLayoutClient from 'components/Docs/DocsLayoutClient';
import { getDocsLayoutNav } from 'components/Docs/getDocsLayoutNav';

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navDocData, navLearnData } = await getDocsLayoutNav('en');
  return (
    <DocsLayoutClient
      NavigationDocsData={navDocData}
      NavigationLearnData={navLearnData}
    >
      {children}
    </DocsLayoutClient>
  );
}

import DocsLayoutServer from 'components/Docs/DocsLayoutServer';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsLayoutServer locale="en">{children}</DocsLayoutServer>;
}

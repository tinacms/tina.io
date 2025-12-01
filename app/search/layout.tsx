'use client';

import { DocsNavigationProvider } from 'components/Docs/DocsNavigationContext';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsNavigationProvider>{children}</DocsNavigationProvider>;
}

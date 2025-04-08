'use client';

import { TinaClient } from 'app/tina-client';
import DocsClient from './[...slug]/docs-client';
import { useNavigationData } from './toc-layout-client';

export default function MainDocClient({ props }) {
  // The main page component gets navigation data from the layout context
  // This way it stays consistent between page changes
  const { NavigationDocsData, NavigationLearnData } = useNavigationData();

  return (
    <TinaClient
      Component={DocsClient}
      props={{
        ...props,
        NavigationDocsData,
        NavigationLearnData,
      }}
    />
  );
}

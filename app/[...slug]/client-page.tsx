'use client';

import { BlocksPage } from 'components/blocks/BlocksPage';
import { FooterLinkBlocksPage } from 'components/blocks/FooterLinkBlocksPage';
import { useTina } from 'tinacms/dist/react';

interface ClientPageProps {
  query: string;
  data: any;
  variables: {
    relativePath: string;
  };
}

// Pages that should use the FooterLinkBlocksPage component
const FOOTER_LINK_PAGES = [
  'security.json',
  'telemetry.json', 
  'terms-of-service.json',
  'privacy-notice.json'
];

export default function ClientPage({
  query,
  data,
  variables,
}: ClientPageProps) {
  const tinaData = useTina({
    query,
    data,
    variables,
  });

  // Check if this is a footer link page
  const isFooterLinkPage = FOOTER_LINK_PAGES.includes(variables.relativePath);

  // Use FooterLinkBlocksPage for footer link pages, BlocksPage for everything else
  const PageComponent = isFooterLinkPage ? FooterLinkBlocksPage : BlocksPage;

  return (
    <PageComponent
      data={tinaData.data.page}
      recentPosts={tinaData.data.recentPosts}
    />
  );
}

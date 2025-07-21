'use client';

import { BlocksPage } from 'components/blocks/BlocksPage';
import { useTina } from 'tinacms/dist/react';

interface ClientPageProps {
  query: string;
  data: any;
  variables: {
    relativePath: string;
  };
}

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
  return (
    <BlocksPage
      data={tinaData.data.page}
      recentPosts={tinaData.data.recentPosts}
    />
  );
}

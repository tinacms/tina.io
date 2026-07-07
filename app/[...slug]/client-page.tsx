'use client';

import { BlocksPage } from 'components/blocks/BlocksPage';
import { useTina } from 'tinacms/dist/react';
import type { ChannelVideo } from '@/utils/youtube/getChannelVideos';

interface ClientPageProps {
  query: string;
  data: any;
  variables: {
    relativePath: string;
  };
  latestVideos?: ChannelVideo[];
}

export default function ClientPage({
  query,
  data,
  variables,
  latestVideos,
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
      latestVideos={latestVideos}
    />
  );
}

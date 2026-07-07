'use client';

import { Blocks } from './Blocks';

export const BlocksPage = ({ data, recentPosts, latestVideos }) => {
  return (
    <>
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <Blocks
        blocks={data.blocks}
        recentPosts={recentPosts}
        latestVideos={latestVideos}
      />
    </>
  );
};

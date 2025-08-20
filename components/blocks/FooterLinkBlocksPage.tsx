'use client';

import { FooterLinkBlocks } from './FooterLinkBlocks';

export const FooterLinkBlocksPage = ({ data, recentPosts }) => {
  return (
    <>
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <FooterLinkBlocks blocks={data.blocks} recentPosts={recentPosts} />
    </>
  );
};


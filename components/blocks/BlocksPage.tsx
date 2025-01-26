'use client';

import { Layout } from '../layout';
import { Blocks } from './Blocks';

export const BlocksPage = ({ data, recentPosts }) => {
  return (
    <>
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <Blocks blocks={data.blocks} recentPosts={recentPosts} />
    </>
  );
};

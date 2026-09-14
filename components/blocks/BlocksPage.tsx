'use client';

import { BillingPeriodProvider } from './BillingPeriodContext';
import { Blocks } from './Blocks';

export const BlocksPage = ({ data, recentPosts }) => {
  return (
    <BillingPeriodProvider>
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <Blocks blocks={data.blocks} recentPosts={recentPosts} />
    </BillingPeriodProvider>
  );
};

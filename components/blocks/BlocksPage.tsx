'use client';

import { BillingPeriodProvider } from './BillingPeriodContext';
import { Blocks } from './Blocks';

export const BlocksPage = ({ data, recentPosts }) => {
  const blocks = (
    <>
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <Blocks blocks={data.blocks} recentPosts={recentPosts} />
    </>
  );
  const hasPricingBlock = data.blocks?.some(
    (block) => block.__typename === 'PageBlocksPricing',
  );
  return hasPricingBlock ? (
    <BillingPeriodProvider>{blocks}</BillingPeriodProvider>
  ) : (
    blocks
  );
};

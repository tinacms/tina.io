'use client';
import dynamic from 'next/dynamic';
import React from 'react';
import type {
  PageBlocks,
  PostConnection,
} from '../../tina/__generated__/types';
import {
  ContentBlock,
  FaqBlock,
  FeatureGridBlock,
  FeaturesBlock,
  FlyingBlock,
  HeroBlock,
  LogoGridBlock,
  PricingBlock,
  QuoteBlock,
  StoryBlock,
} from './';

import { ColumnsBlock } from './Columns/Columns';
import { VerticalCardsBlock } from './Events/Events';
import { FooterLinkWrapper } from './FooterLinkContainer';
import { HighlightsSection } from './HighlightsSection/HighlightsSection';
import { MediaComponent } from './Media/MediaComponent';
import { RecentPostsBlock } from './RecentPosts/RecentPosts';
import RecipeBlock from './Recipe';
import { RoadmapGridBlock } from './RoadMap/RoadmapGrid';
import { ShowcaseItemsBlock } from './Showcase/Showcase';
import { SpacerComponent } from './Spacer/Spacer';
import TableBox from './Table/table';
import { TextAndMediaColumnsComponent } from './TextAndMediaColumn/TextAndMediaColumns';
import { TinaBanner } from './TinaBanner/TinaBanner';
import VideoDisplay from './VideoEmbed/videoEmbed';

const CarouselFeatureBlock = dynamic(
  () => import('./FeatureCarousel/CarouselFeature'),
  { ssr: false },
);
const TestimonialsBlock = dynamic(() => import('./Testimonial/Testimonials'), {
  ssr: false,
});
const BookingBlock = dynamic(() => import('./Booking/Booking'), { ssr: false });
const CompareBoxBlock = dynamic(() => import('./CompareBox/CompareBox'), {
  ssr: false,
});

const blockByType = (block: PageBlocks, index: number, recentPosts?) => {
  switch (block.__typename) {
    case 'PageBlocksFeatures':
      return <FeaturesBlock data={block} index={index} />;
    case 'PageBlocksCompareBox':
      return <CompareBoxBlock data={block} index={index} />;
    case 'PageBlocksFlying':
      return <FlyingBlock data={block} index={index} />;
    case 'PageBlocksEvents':
      return <VerticalCardsBlock />;
    case 'PageBlocksTable':
      return <TableBox data={block} index={index} />;
    case 'PageBlocksMediaComponent':
      return <MediaComponent data={block} />;
    case 'PageBlocksBooking':
      return <BookingBlock data={block} />;
    case 'PageBlocksHero':
      return <HeroBlock data={block} index={index} />;
    case 'PageBlocksPricing':
      return <PricingBlock data={block} />;
    case 'PageBlocksFaq':
      return <FaqBlock data={block} index={index} />;
    case 'PageBlocksContent':
      return <ContentBlock data={block} />;
    case 'PageBlocksColumns':
      return <ColumnsBlock data={block} />;
    case 'PageBlocksRecipeBlock':
      return <RecipeBlock data={block} />;
    case 'PageBlocksShowcase':
      return <ShowcaseItemsBlock data={block} index={index} />;
    case 'PageBlocksStory':
      return <StoryBlock index={index} />;
    case 'PageBlocksFeatureGrid':
      return <FeatureGridBlock data={block} index={index} />;
    case 'PageBlocksLogoGrid':
      return <LogoGridBlock data={block} index={index} />;
    case 'PageBlocksCarouselFeature':
      return <CarouselFeatureBlock data={block} index={index} />;
    case 'PageBlocksRoadmapGrid':
      return <RoadmapGridBlock data={block} index={index} />;
    case 'PageBlocksRecentPosts':
      return (
        <RecentPostsBlock
          data={block}
          index={index}
          recentPosts={recentPosts}
        />
      );
    case 'PageBlocksTestimonials':
      return <TestimonialsBlock data={block} />;
    case 'PageBlocksQuote':
      return <QuoteBlock data={block} index={index} />;
    case 'PageBlocksTextMediaColumnComponent':
      return <TextAndMediaColumnsComponent data={block} />;
    case 'PageBlocksTinaBanner':
      return <TinaBanner data={block} />;
    case 'PageBlocksHighlightsSection':
      return <HighlightsSection data={block} />;
    case 'PageBlocksSpacer':
      return <SpacerComponent data={block} />;
    case 'PageBlocksVideoEmbed':
      return <VideoDisplay data={block} />;
    default:
      return null;
  }
};

export const FooterLinkBlocks = ({
  blocks,
  recentPosts,
}: {
  blocks: PageBlocks[];
  recentPosts: PostConnection;
}) => {
  if (!blocks) {
    return null;
  }

  return blocks.map((block, index) => {
    return (
      <FooterLinkWrapper
        data={block.blockSettings}
        key={`${block.__typename}-${index}`}
      >
        {blockByType(block, index, recentPosts)}
      </FooterLinkWrapper>
    );
  });
};


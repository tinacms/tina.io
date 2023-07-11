import type { PageBlocks, PostConnection } from '../../tina/__generated__/types'
import {
  StoryBlock,
  FeatureGridBlock,
  FeaturesBlock,
  FlyingBlock,
  HeroBlock,
  PricingBlock,
  FaqBlock,
  ContentBlock,
  LogoGridBlock,
} from './'
import { ColumnsBlock } from './Columns'
import { RecentPostsBlock } from './RecentPosts'
import { RoadmapGridBlock } from './RoadmapGrid'
import { ShowcaseItemsBlock } from './Showcase'
import { TestimonialsBlock } from './Testimonials'

export const Blocks = ({
  blocks,
  recentPosts,
}: {
  blocks: PageBlocks[]
  recentPosts: PostConnection
}) => {
  if (!blocks) return null
  return blocks.map((block, index) => {
    switch (block.__typename) {
      case 'PageBlocksFeatures':
        return (
          <FeaturesBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksFlying':
        return <FlyingBlock key={`block-${index}`} data={block} index={index} />
      case 'PageBlocksHero':
        return <HeroBlock key={`block-${index}`} data={block} index={index} />
      case 'PageBlocksPricing':
        return (
          <PricingBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksFaq':
        return <FaqBlock key={`block-${index}`} data={block} index={index} />
      case 'PageBlocksContent':
        return (
          <ContentBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksColumns':
        return (
          <ColumnsBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksShowcase':
        return (
          <ShowcaseItemsBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        )
      case 'PageBlocksStory':
        return <StoryBlock key={`block-${index}`} data={block} index={index} />
      case 'PageBlocksFeatureGrid':
        return (
          <FeatureGridBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksLogoGrid':
        return (
          <LogoGridBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksRoadmapGrid':
        return (
          <RoadmapGridBlock key={`block-${index}`} data={block} index={index} />
        )
      case 'PageBlocksRecentPosts':
        return (
          <RecentPostsBlock
            key={`block-${index}`}
            data={block}
            index={index}
            recentPosts={recentPosts}
          />
        )
      case 'PageBlocksTestimonials':
        return (
          <TestimonialsBlock
            key={`block-${index}`}
            data={block}
            index={index}
          />
        )
      default:
        return null
    }
  })
}

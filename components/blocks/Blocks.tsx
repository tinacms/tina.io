import type { PageBlocks, PostConnection } from '../../.tina/__generated__/types'
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

export const Blocks = ({ blocks, recentPosts }: { blocks: PageBlocks[], recentPosts: PostConnection }) => {
  if (!blocks) return null
  return blocks.map((block, index) => {
    switch (block.__typename) {
      case 'PageBlocksFeatures':
        return <FeaturesBlock data={block} index={index} />
      case 'PageBlocksFlying':
        return <FlyingBlock data={block} index={index} />
      case 'PageBlocksHero':
        return <HeroBlock data={block} index={index} />
      case 'PageBlocksPricing':
        return <PricingBlock data={block} index={index} />
      case 'PageBlocksFaq':
        return <FaqBlock data={block} index={index} />
      case 'PageBlocksContent':
        return <ContentBlock data={block} index={index} />
      case 'PageBlocksColumns':
        return <ColumnsBlock data={block} index={index} />
      case 'PageBlocksShowcase':
        return <ShowcaseItemsBlock data={block} index={index} />
      case 'PageBlocksStory':
        return <StoryBlock data={block} index={index} />
      case 'PageBlocksFeatureGrid':
        return <FeatureGridBlock data={block} index={index} />
      case 'PageBlocksLogoGrid':
        return <LogoGridBlock data={block} index={index} />
      case 'PageBlocksRoadmapGrid':
        return <RoadmapGridBlock data={block} index={index} />
      case 'PageBlocksRecentPosts':
        return <RecentPostsBlock data={block} index={index} recentPosts={recentPosts} />
      default:
        return null
    }
  })
}

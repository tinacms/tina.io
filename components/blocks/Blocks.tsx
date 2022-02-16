import type {PageBlocks, PageBlocksFeaturesItems} from '../../.tina/__generated__/types'
import { FeaturesBlock, FlyingBlock, HeroBlock, PricingBlock, FaqBlock } from './'

export const Blocks = ({ blocks }: {blocks: (PageBlocks|PageBlocksFeaturesItems)[]}) => {
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
      default:
        return null
    }
  })
}

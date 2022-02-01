import * as React from 'react'
import { FeatureBlock, FeaturesBlock, FlyingBlock, HeroBlock } from './'

export const Blocks = ({ blocks }: any) => {
  return blocks.map((block: any, index) => {
    switch (block._template) {
      case 'features':
        return <FeaturesBlock data={block} index={index} />
      case 'feature':
        return <FeatureBlock data={block} index={index} />
      case 'flying':
        return <FlyingBlock data={block} index={index} />
      case 'hero':
        return <HeroBlock data={block} index={index} />
      default:
        return null
    }
  })
}

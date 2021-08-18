import {
  FeaturesBlock,
  features_template,
  FlyingBlock,
  flying_template,
  HeroBlock,
  hero_template,
} from './'

export const HOMEPAGE_TEMPLATES = {
  hero: hero_template,
  features: features_template,
  flying: flying_template,
}

export const HOMEPAGE_BLOCKS = {
  hero: {
    Component: HeroBlock,
    template: hero_template,
  },
  features: {
    Component: FeaturesBlock,
    template: features_template,
  },
  flying: {
    Component: FlyingBlock,
    template: flying_template,
  },
}

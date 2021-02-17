import {
  BrowserBlock,
  browser_template,
  DemoBlock,
  demo_teamplate,
  FeaturesBlock,
  features_template,
  FlyingBlock,
  flying_template,
  HeroBlock,
  hero_template,
  NavbarBlock,
  navbar_template,
} from './'

export const HOMEPAGE_TEMPLATES = {
  navbar: navbar_template,
  hero: hero_template,
  features: features_template,
  demo: demo_teamplate,
  browser: browser_template,
  flying: flying_template,
}

export const HOMEPAGE_BLOCKS = {
  navbar: {
    Component: NavbarBlock,
    template: navbar_template,
  },
  hero: {
    Component: HeroBlock,
    template: hero_template,
  },
  features: {
    Component: FeaturesBlock,
    template: features_template,
  },
  demo: {
    Component: DemoBlock,
    template: demo_teamplate,
  },
  browser: {
    Component: BrowserBlock,
    template: browser_template,
  },
  flying: {
    Component: FlyingBlock,
    template: flying_template,
  },
}

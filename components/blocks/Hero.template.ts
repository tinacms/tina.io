import type { TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'

export const heroTemplate: TinaTemplate = {
  label: 'Hero',
  name: 'hero',
  ui: {
    previewSrc: '/img/blocks/hero.png',
    defaultItem: {
      headline: 'Next Gen Content Management',
      text: 'Tina is an open-source, Git-backed CMS with the ability to add visual editing to your NextJS site',
      actions: [
        {
          variant: 'orange',
          label: 'Primary Action',
          icon: true,
          url: '/',
        },
        {
          variant: '',
          label: 'Secondary Action',
          icon: false,
          url: '/',
        },
      ],
    },
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    { name: 'text', label: 'Text', type: 'string' },
    // @ts-ignore
    actionsTemplate,
    { name: 'videoSrc', label: 'Video Source', type: 'string' },
    {
      name: 'margin',
      description: 'Default is px-8 py-12 lg:py-16',
      label: 'Custom Margin',
      type: 'string',
    },
    {
      name: 'spacing',
      description: 'Default is gap-6',
      label: 'Custom Spacing',
      type: 'string',
    },
  ],
}

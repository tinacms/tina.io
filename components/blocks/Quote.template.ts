import type { TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'
import { socialTemplate } from './Social.template'
import { newsletterTemplate } from './Newsletter.template'

export const quoteTemplate: TinaTemplate = {
  label: 'Quote',
  name: 'quote',
  ui: {
    // previewSrc: '/img/blocks/columns.png',
  },
  fields: [
    {
      label: 'Title',
      name: 'title2',
      type: 'string',
    },
  ],
}

import type { TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'

export const featuresTemplate: TinaTemplate = {
  label: 'Features',
  name: 'features',
  ui: {
    previewSrc: '/img/blocks/features.png',
  },
  fields: [
    {
      name: 'items',
      label: 'Feature Items',
      type: 'object',
      list: true,
      templates: [
        {
          label: 'Feature',
          name: 'feature',
          fields: [
            { name: 'headline', label: 'Headline', type: 'string' },
            {
              name: 'text',
              label: 'Text',
              ui: { component: 'textarea' },
              type: 'string',
            },
            {
              name: 'media',
              label: 'Media',
              type: 'object',
              fields: [
                { name: 'src', label: 'Image Source', type: 'string' },
                { name: 'videoSrc', label: 'Video Source', type: 'string' },
                { name: 'cli', label: 'CLI', type: 'boolean' },
              ],
            },
            // @ts-ignore
            actionsTemplate,
          ],
        },
      ],
    },
  ],
}

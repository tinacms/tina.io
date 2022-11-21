import type { TinaTemplate } from 'tinacms'

export const showcaseTemplate: TinaTemplate = {
  label: 'Showcase',
  name: 'showcase',
  ui: {
    previewSrc: '/img/blocks/features.png',
  },
  fields: [
    {
      name: 'items',
      label: 'Showcase Items',
      type: 'object',
      list: true,
      templates: [
        {
          label: 'Project',
          name: 'project',
          fields: [
            { name: 'headline', label: 'Headline', type: 'string' },
            {
              name: 'text',
              label: 'Text',
              ui: { component: 'textarea' },
              type: 'string',
            },
            { name: 'url', label: 'URL', type: 'string' },
            {
              name: 'media',
              label: 'Media',
              type: 'object',
              fields: [{ name: 'src', label: 'Image Source', type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
}

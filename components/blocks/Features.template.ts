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
      name: 'features',
      label: 'Feature Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.headline }
        },
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'text',
          label: 'Text',
          ui: { component: 'textarea' },
          type: 'string',
        },
        // @ts-ignore
        actionsTemplate,
        // Block field with image, video or text as template options
        {
          name: 'media',
          label: 'Media',
          type: 'object',
          list: true,
          ui: {
            min: 0,
            max: 1,
          },
          templates: [
            {
              name: 'image',
              label: 'Image',
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'image',
                },
              ],
            },
            {
              name: 'video',
              label: 'Video',
              fields: [
                {
                  name: 'src',
                  label: 'Video Source',
                  description:
                    'This is the Cloudinary Public ID, for example "tina-io/docs/quick-edit-demo".',
                  type: 'string',
                },
              ],
            },
            {
              name: 'code',
              label: 'Code',
              ui: {
                defaultItem: {
                  file: 'index.js',
                  code: 'console.log("Hello World")',
                  language: 'javascript',
                  scale: 1,
                },
              },
              fields: [
                {
                  name: 'file',
                  label: 'Filename',
                  type: 'string',
                },
                {
                  name: 'code',
                  label: 'Code',
                  type: 'string',
                  ui: {
                    component: 'textarea',
                  },
                },
                {
                  name: 'language',
                  label: 'Language',
                  type: 'string',
                },
                {
                  name: 'scale',
                  label: 'Text Scale',
                  type: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

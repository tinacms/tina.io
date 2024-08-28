import type { Template, TinaTemplate } from 'tinacms'
import { actionsButtonTemplate } from './ActionsButton.template'
import { modalButtonTemplate } from './ModalButton.template'
import { codeButtonTemplate } from './CodeButton.template'

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
      ],
    },
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
    {
      name: 'mobileTextSize',
      description: 'Default text size on mobile is xl',
      label: 'Mobile Text Size (toggle for smaller body text)',
      type: 'boolean',
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
  ],
}

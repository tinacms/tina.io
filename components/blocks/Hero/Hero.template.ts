import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '../CodeButton/CodeButton.template';
import { modalButtonTemplate } from '../ModalButton/ModalButton.template';

export const heroTemplate: Template = {
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
    {
      name: 'headline2',
      label: 'Headline 2',
      type: 'string',
      description:
        'This is the second headline, it will be displayed below the first headline.',
    },
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
            {
              name: 'link',
              label: 'Video Link',
              description: 'This is the link when the video is clicked.',
              type: 'string',
            },
          ],
        },
        {
          name: 'thumbnailToInternalVideo',
          label: 'Image Thumbnail to Internal YouTube Video',
          fields: [
            {
              name: 'thumbnailImage',
              label: 'Thumbnail Image',
              type: 'image',
            },
            {
              name: 'videoEmbedId',
              label: 'YouTube Video Embed ID',
              type: 'string',
            },
            {
              name: 'figureCaption',
              label: 'Figure Caption',
              type: 'string',
            },
          ],
        },
        {
          name: 'videoThumbnailToInternalVideo',
          label: 'Video Thumbnail to Internal YouTube Video',
          fields: [
            {
              name: 'thumbnailVideo',
              label: 'Thumbnail Video',
              type: 'image',
            },
            {
              name: 'videoEmbedId',
              label: 'YouTube Video Embed ID',
              type: 'string',
            },
            {
              name: 'figureCaption',
              label: 'Figure Caption',
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
      name: 'smallerMobileBodyText',
      description: 'Default text size on mobile is xl',
      label: 'Mobile Text Size (off = xl, on = lg)',
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
};

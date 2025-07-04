import { act } from '@react-three/fiber';
import { ModalButton } from 'components/ui';
import type { Template, TinaField } from 'tinacms';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '../CodeButton/CodeButton.template';
import { modalButtonTemplate } from '../ModalButton/ModalButton.template';

export const featuresTemplate: Template = {
  label: '<⭐> Features',
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
          return { label: item?.headline };
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
        {
          label: 'Buttons',
          list: true,
          name: 'buttons',
          type: 'object',
          ui: {
            visualSelector: true,
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          templates: [
            actionsButtonTemplate as Template,
            modalButtonTemplate as Template,
            codeButtonTemplate as Template,
          ],
        },
        {
          name: 'alignCenter',
          label: 'Align Center',
          type: 'boolean',
          default: false,
        },
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
              name: 'v2Video',
              label: 'v2Video',
              type: 'object',
              description:
                'This is so that we dont ruin sources using the old video object',
              fields: [
                {
                  name: 'src',
                  label: 'Video Source',
                  type: 'image',
                },
              ],
            },
            {
              name: 'thumbnailToInternalVideo',
              label: 'Image Thumbnail to Internal YouTube Video',
              type: 'object',
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
              type: 'object',
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
          name: 'isFullScreen',
          label: 'Should the feature blocks be set to a full screen?',
          description: 'use this for large bold stand alone items',
          type: 'boolean',
          ui: {
            component: 'toggle',
            parse: (value) => !!value,
            format: (value) => !!value,
          },
        },
        {
          name: 'isReversed',
          label: 'Text on Right?',
          description:
            'This is the position of the text, relative to the media. Off is left, and on is right.',
          type: 'boolean',
          ui: {
            component: 'toggle',
            parse: (value) => !!value,
            format: (value) => !!value,
          },
        },
        {
          name: 'imageBackground',
          label: 'Image Background',
          description:
            'This will toggle the background and bordering of the media. This will only have visible changes if the media has a transparent background.',
          type: 'boolean',
          ui: {
            component: 'toggle',
            parse: (value) => !!value,
            format: (value) => !!value,
          },
        },
      ] as TinaField[],
    },
  ],
};

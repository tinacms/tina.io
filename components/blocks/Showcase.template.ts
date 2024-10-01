import type { Template } from 'tinacms';

export const showcaseTemplate: Template = {
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
        { name: 'url', label: 'URL', type: 'string' },
        {
          name: 'media',
          label: 'Media',
          type: 'object',
          fields: [{ name: 'src', label: 'Image Source', type: 'image' }],
        },
      ],
    },
  ],
};

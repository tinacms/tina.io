import type { Template } from 'tinacms';

export const markdownFeatureTemplate: Template = {
  name: 'markdownFeature',
  label: 'Markdown Feature',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string',
    },
    {
      name: 'bodyText',
      label: 'Body Text',
      type: 'string',
      ui: { component: 'textarea' },
    },
    {
      name: 'badges',
      label: 'Badges',
      type: 'string',
      list: true,
    },
    {
      name: 'mascotImage',
      label: 'Mascot Image',
      type: 'image',
    },
  ],
};

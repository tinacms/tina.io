import type { Template } from 'tinacms';

export const spacerTemplate: Template = {
  label: '<⭐> Spacer',
  name: 'spacer',
  ui: {
    previewSrc: '/img/blocks/spacer.png',
  },
  fields: [
    {
      name: 'spacingPx',
      label: 'Spacing Value',
      description: 'This is the spacing in pixels provided by the spacer.',
      type: 'number',
    },
    {
      name: 'spacingPxMobile',
      label: 'Mobile Spacing Value',
      description:
        'This is the spacing in pixels provided by the spacer on small screens.',
      type: 'number',
    },
  ],
};

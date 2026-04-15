import type { Template } from 'tinacms';

export const markdownFeatureTemplate: Template = {
  name: 'markdownFeature',
  label: 'Markdown Feature',
  ui: {
    previewSrc: '/img/blocks/markdownFeature.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      description:
        'Use {curly braces} around words to highlight them in orange.',
    },
    {
      name: 'subtext',
      label: 'Subtext',
      type: 'string',
      ui: { component: 'textarea' },
    },
    {
      name: 'featureTags',
      label: 'Feature Tags',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'string',
        },
      ],
    },
    {
      name: 'secondaryImage',
      label: 'Secondary Image (e.g. Llama)',
      type: 'image',
    },
  ],
};

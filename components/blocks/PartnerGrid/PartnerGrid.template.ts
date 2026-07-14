import type { Template } from 'tinacms';

export const partnerGridTemplate: Template = {
  label: 'Partner Grid',
  name: 'partnerGrid',
  ui: {
    previewSrc: '/img/blocks/feature-grid.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'subText',
      label: 'Sub Text',
      type: 'string',
      ui: {
        component: 'textarea',
      },
    },
    {
      name: 'items',
      label: 'Partners',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'logo', label: 'Logo', type: 'image' },
        {
          name: 'tier',
          label: 'Tier',
          type: 'string',
          options: ['Certified', 'Premier'],
        },
        { name: 'location', label: 'Location', type: 'string' },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: { component: 'textarea' },
        },
        {
          name: 'services',
          label: 'Services',
          type: 'string',
          list: true,
        },
        { name: 'website', label: 'Website', type: 'string' },
      ],
    },
  ],
};

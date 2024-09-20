import type { TinaTemplate } from 'tinacms'

export const logoGridTemplate: TinaTemplate = {
  label: 'Logo Grid',
  name: 'logoGrid',
  ui: {
    previewSrc: '/img/blocks/logo-grid.png',
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      label: 'Link',
      name: 'link',
      type: 'string',
    },
    {
      name: 'items',
      label: 'Logos',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
          description: 'The URL to link to when the logo is clicked. Should be either (1) an internal link (e.g. /showcase#unity) or (2) an external link (e.g. https://ndcconferences.com/).',
        },
        { name: 'logo', label: 'Logo Image', type: 'image' },
        { name: 'size', label: 'Size', type: 'number' },
      ],
    },
  ],
}

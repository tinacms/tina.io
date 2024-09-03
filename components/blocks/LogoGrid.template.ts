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
          ui: {
            validate: (val) => {
              // make sure value is https url
              if (!val?.startsWith('https://')) {
                return 'Must be a valid https url'
              }
            },
          },
        },
        { name: 'logo', label: 'Logo Image', type: 'image' },
        { name: 'size', label: 'Size', type: 'number' },
      ],
    },
  ],
}

import type { TinaTemplate } from 'tinacms'

export const logoGridTemplate: TinaTemplate = {
  label: 'Logo Grid',
  name: 'logoGrid',
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
        { name: 'logo', label: 'Logo Link', type: 'string' },
        { name: 'size', label: 'Size', type: 'number' },
      ],
    },
  ],
}

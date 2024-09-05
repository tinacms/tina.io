import type { Template } from 'tinacms';

export const testyTemplate = {
    label: 'Actions',
    name: 'actions',
    type: 'object',
    list: true,
    ui: {
      itemProps: (item) => {
        return { label: item?.label }
      },
      defaultItem: {
        variant: 'default',
        label: 'Secondary Action',
        icon: false,
        size: 'medium',
        url: '/',
      },
    },
    fields: [
      { name: 'label', label: 'Label', type: 'string' },
      { name: 'icon', label: 'Icon', type: 'boolean' },
      {
        name: 'variant',
        label: 'Variant',
        type: 'string',
        options: [
          { value: 'default', label: 'Seafoam' },
          { value: 'blue', label: 'Blue' },
          { value: 'orange', label: 'Orange' },
          { value: 'white', label: 'White' },
          { value: 'ghost', label: 'Ghost' },
          { value: 'orangeWithBorder', label: 'Orange with Border' },
        ],
      },
      {
        name: 'size',
        label: 'Size',
        type: 'string',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
      },
      { name: 'url', label: 'URL', type: 'string' },
    ],
  }
  




export const navigationBarCollection = {
  label: 'Actions',
  name: 'actions',
  path: 'content/navBar',

  fields: [
    {
      name: 'navigationBar',
      label: 'Navigation Bar',
      type: 'string',
    },
    {
      name: 'navItem',
      label: 'Navigation Item',
      list: true,
      type: 'object',
      templates: [
        testyTemplate as Template,
        {
          name: 'stringItem',
          label: 'String Item',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'string',
            },
            {
              name: 'url',
              label: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};

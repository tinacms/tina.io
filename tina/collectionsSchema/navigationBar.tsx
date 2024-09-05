export const navigationBarCollection = {
  label: 'Navigation Bar',
  name: 'navigationBar',
  path: 'content/navigationBar',
  format: 'json',
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
        {
          name: 'stringItem',
          label: 'String Item',
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
            {
              name: 'href',
              label: 'href',
              type: 'string',
            },
          ],
        },
        {
          name: 'buttonItem',
          label: 'Button Item',
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
            {
              name: 'href',
              label: 'href',
              type: 'string',
            },
            {
              name: 'buttonColour',
              label: 'Button Colour',
              type: 'string',
              options: [
                { value: 'default', label: 'Seafoam' },
                { value: 'blue', label: 'Blue' },
                { value: 'orange', label: 'Orange' },
                { value: 'white', label: 'White' },
                { value: 'ghost', label: 'Ghost' },
                { value: 'command', label: 'Command' },
              ],
            },
          ],
        },
        {
          name: 'groupOfStringItems',
          label: 'Group Of String Items',
          list: true,
          type: 'object',
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
            {
              name: 'items',
              label: 'Page or Submenu',
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
                {
                  name: 'href',
                  label: 'href',
                  type: 'string',
                },
              ]
            },
          ],
        },
      ],
    },
  ],
};

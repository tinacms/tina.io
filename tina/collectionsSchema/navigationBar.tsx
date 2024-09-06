const modals = ['BookDemo', 'EmailForm'];
const iconOptions = ['FaCalendarDay', 'MdEmail'];

export const navigationBarCollection = {
  label: 'Navigation Bar',
  name: 'navigationBar',
  path: 'content/navigationBar',
  format: 'json',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    }
  },
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
              return { label: '📄' + item?.label };
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
          name: 'groupOfStringItems',
          label: 'Group Of String Items',
          list: true,
          type: 'object',
          ui: {
            itemProps: (item) => {
              return { label: '📕' + item?.label };
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
              ],
            },
          ],
        },
        //Note we are duplicating the ModalButton template from /components/blocks/ModalButton.template.ts but this is
        //because this file is generated before hand and i still want to keep the ModalButton coupled into the components dir too

        {
          label: 'Modal Button',
          name: 'modalButton',
          type: 'object',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: '🚨' + item?.label };
            },
            defaultItem: {
              variant: 'default',
              label: 'Secondary Action',
              icon: false,
              size: 'medium',
            },
          },
          fields: [
            { name: 'label', label: 'Label', type: 'string' },
            {
              name: 'color',
              label: 'Color',
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
            { name: 'modal', label: 'Modal', type: 'string', options: modals },
            { name: 'icon', label: 'Icon', type: 'string', options: iconOptions, description: 'If you want a new icon added please ask a developer :)'},
          ],
        },
      ],
    },
  ],
};

export const footerCollection = {
  name: 'footer',
  label: 'Footer',
  path: 'content/footer',
  format: 'json',
  fields: [
    {
      name: 'LogoImage',
      label: 'Logo Image',
      type: 'image',
      list: false,
      description: '',
    },
    {
      name: 'Column1',
      label: 'Column 1',
      type: 'object',
      list: false,
      fields: [
        { name: 'header', label: 'Header', type: 'string' },
        {
          name: 'footerItem',
          label: 'Footer Item',
          type: 'object',
          list: true,
          templates: [
            {
              name: 'stringItem',
              label: 'String Item',
              ui: {
                itemProps: (item) => {
                  return { label: '🔗 ' + item?.label };
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
                  return { label: '🗂️ ' + item?.label };
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
            {
              name: 'socialLink',
              label: 'Social Link',
              ui: {
                itemProps: (item) => {
                  return { label: '👤 ' + item?.label };
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
                  name: 'image',
                  label: 'Image',
                  type: 'image',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Column2',
      label: 'Column 2',
      type: 'object',
      list: false,
      fields: [
        { name: 'header', label: 'Header', type: 'string' },
        {
          name: 'footerItem',
          label: 'Footer Item',
          type: 'object',
          list: true,
          templates: [
            {
              name: 'stringItem',
              label: 'String Item',
              ui: {
                itemProps: (item) => {
                  return { label: '🔗 ' + item?.label };
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
                  return { label: '🗂️ ' + item?.label };
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
            {
              name: 'socialLink',
              label: 'Social Link',
              ui: {
                itemProps: (item) => {
                  return { label: '👤 ' + item?.label };
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
                  name: 'image',
                  label: 'Image',
                  type: 'image',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Column3',
      label: 'Column 3',
      type: 'object',
      list: false,
      fields: [
        { name: 'header', label: 'Header', type: 'string' },
        {
          name: 'footerItem',
          label: 'Footer Item',
          type: 'object',
          list: true,
          templates: [
            {
              name: 'stringItem',
              label: 'String Item',
              ui: {
                itemProps: (item) => {
                  return { label: '🔗 ' + item?.label };
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
                  return { label: '🗂️ ' + item?.label };
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
            {
              name: 'socialLink',
              label: 'Social Link',
              ui: {
                itemProps: (item) => {
                  return { label: '👤 ' + item?.label };
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
                  name: 'image',
                  label: 'Image',
                  type: 'image',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Column4',
      label: 'Column 4',
      type: 'object',
      list: false,
      fields: [
        { name: 'header', label: 'Header', type: 'string' },
        {
          name: 'footerItem',
          label: 'Footer Item',
          type: 'object',
          list: true,
          templates: [
            {
              name: 'stringItem',
              label: 'String Item',
              ui: {
                itemProps: (item) => {
                  return { label: '🔗 ' + item?.label };
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
                  return { label: '🗂️ ' + item?.label };
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
            {
              name: 'socialLink',
              label: 'Social Link',
              ui: {
                itemProps: (item) => {
                  return { label: '👤 ' + item?.label };
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
                  name: 'image',
                  label: 'Image',
                  type: 'image',
                },
              ],
            },
          ],
        },
      ],
    },



    // Column1 - Only an image (logo)
    // Column2 - Has title and items (Product)
    // Column3 - Has title and items (Resources)
    // Column4 - Has title and items (No title)
    // Column5 - Has title and items (No title)
    // Bottom Footer
  ],
};

// Item options - Group (opens)
//              - Item
//              - Social Link (has text, image and link)

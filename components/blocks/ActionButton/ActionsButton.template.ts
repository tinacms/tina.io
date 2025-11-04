export const actionsButtonTemplateFields = {
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
    { name: 'icon', label: 'Icon', type: 'boolean' },
    {
      name: 'shape',
      label: 'Shape',
      type: 'string',
      options: [
        { value: 'square', label: 'Square' },
        { value: 'pill', label: 'Pill' },
      ],
    },
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
        { value: 'ghostBlue', label: 'Ghost Blue' },
        { value: 'ghostOutline', label: 'Ghost Outline' },
        { value: 'black', label: 'Black' },
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
};

export const actionsButtonTemplate = {
  label: 'Actions',
  name: 'actions',
  type: 'object',
  list: true,
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    },
    defaultItem: {
      variant: 'default',
      label: 'Secondary Action',
      icon: false,
      size: 'medium',
      url: '/',
    },
  },
  fields: actionsButtonTemplateFields.fields,
};

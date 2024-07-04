const modals = ['BookDemo.tsx', 'EmailForm.tsx'];

export const actionsTemplate = {
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
    {
      name: 'buttonType',
      label: 'Button Type',
      type: 'string',
      options: [
        { value: 'link', label: 'Link Button' },
        { value: 'modal', label: 'Modal Open Button' },
        { value: 'command', label: 'Command Button'}
      ],
    },
    { name: 'url', label: 'URL', type: 'string', description: 'Leave blank for modal buttons' },
    { name: 'modal', label: 'Modal', type: 'string', options: modals, description:'Leave blank for NON modal buttons' },
  ],
};

const modals = ['BookDemo.tsx', 'EmailForm.tsx'];

export const modalButtonTemplateFields = [
  { name: 'label', label: 'Label', type: 'string' },
  { name: 'icon', label: 'Icon', type: 'boolean' },
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
];

export const modalButtonTemplate = {
  label: 'Modal Button',
  name: 'modalButton',
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
    },
  },
  fields: modalButtonTemplateFields, 
};

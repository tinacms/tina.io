const _modals = ['BookDemo.tsx', 'EmailForm.tsx'];

export const codeButtonTemplate = {
  label: 'Code Button',
  name: 'codeButton',
  type: 'object',
  list: true,
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    },
  },
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
    {
      name: 'helpText',
      label: 'Help Text',
      type: 'rich-text',
      description:
        'Optional:This text will appear when the user clicks on the button',
    },
    {
      name: 'starterTemplates',
      label: 'Starter Templates',
      type: 'object',
      list: true,
      description:
        'Optional: Starter templates shown in the dropdown when clicked',
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        { name: 'title', label: 'Title', type: 'string' },
        { name: 'icon', label: 'Icon', type: 'image' },
        { name: 'link', label: 'Link', type: 'string' },
      ],
    },
  ],
};

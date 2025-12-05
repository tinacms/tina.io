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
      name: 'popOverText',
      label: 'Pop Over Text',
      type: 'rich-text',
      description:
        'Optional:This text will appear when the user clicks on the button',
    },
  ],
};

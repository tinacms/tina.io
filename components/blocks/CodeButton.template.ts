const modals = ['BookDemo.tsx', 'EmailForm.tsx'];

export const codeButtonTemplate = {
  label: 'Code Button',
  name: 'codeButton',
  type: 'object',
  list: true,
  ui: {
    itemProps: (item) => {
      return { label: item?.label };
    }
  },
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
  ],
};

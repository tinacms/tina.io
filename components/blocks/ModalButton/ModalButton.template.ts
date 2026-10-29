import { BUTTON_LEVEL_OPTIONS } from '../../styles/buttons';

const modals = [
  'BookDemo.tsx',
  'EmailForm.tsx',
  'ContactForm.tsx',
  'BecomePartner.tsx',
];

export const modalButtonTemplateFields = [
  { name: 'label', label: 'Label', type: 'string' },
  {
    name: 'color',
    label: 'Level',
    type: 'string',
    description:
      'A section’s only button is Primary. Tertiary sits beside a Primary.',
    options: BUTTON_LEVEL_OPTIONS,
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
      color: 'secondary',
      label: 'Secondary Action',
    },
  },
  fields: modalButtonTemplateFields,
};

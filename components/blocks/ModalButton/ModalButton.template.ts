import { BUTTON_LEVEL_OPTIONS } from '../../styles/buttons';

const modals = [
  'BookDemo.tsx',
  'EmailForm.tsx',
  'ContactForm.tsx',
  'BecomePartner.tsx',
];

export const modalButtonTemplateFields = [
  { name: 'label', label: 'Label', type: 'string' },
  { name: 'icon', label: 'Arrow', type: 'boolean' },
  {
    name: 'color',
    label: 'Level',
    type: 'string',
    description:
      'Primary for the main action, Tertiary beside a Primary, Secondary on its own.',
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
      icon: false,
    },
  },
  fields: modalButtonTemplateFields,
};

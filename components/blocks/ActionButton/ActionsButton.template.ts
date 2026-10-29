import { BUTTON_LEVEL_OPTIONS } from '../../styles/buttons';

export const actionsButtonTemplateFields = {
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
    {
      name: 'variant',
      label: 'Level',
      type: 'string',
      description:
        'A section’s only button is Primary. Tertiary sits beside a Primary. Text link for “Read more →” links.',
      options: [
        ...BUTTON_LEVEL_OPTIONS,
        { value: 'textLink', label: 'Text link: “Read more →”' },
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
      variant: 'secondary',
      label: 'Secondary Action',
      url: '/',
    },
  },
  fields: actionsButtonTemplateFields.fields,
};

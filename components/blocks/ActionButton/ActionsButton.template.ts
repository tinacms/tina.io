import { BUTTON_LEVEL_OPTIONS } from '../../styles/buttons';

export const actionsButtonTemplateFields = {
  fields: [
    { name: 'label', label: 'Label', type: 'string' },
    { name: 'icon', label: 'Arrow', type: 'boolean' },
    {
      name: 'variant',
      label: 'Level',
      type: 'string',
      description:
        'Primary for the main action, Tertiary beside a Primary, Secondary on its own. Text link for “Read more →” links.',
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
      icon: false,
      url: '/',
    },
  },
  fields: actionsButtonTemplateFields.fields,
};

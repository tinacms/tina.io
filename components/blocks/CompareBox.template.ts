import type { Template } from 'tinacms';

export const compareBoxTemplate: Template = {
  label: 'Compare Box',
  name: 'CompareBox',
  fields: [
    {
      name: 'criteriaItems',
      label: 'Criteria',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.criteria,
        }),
      },
      fields: [
        { name: 'criteria', label: 'Criteria', type: 'string' },
        {
          name: 'description',
          label: 'Description',
          ui: { component: 'textarea' },
          type: 'string',
          description:
            'The text inside the description will NOT be displayed anywhere, this is just to elaborate on the criteria itself for our own users.',
        },
      ],
    },
    {
      name: 'companies',
      label: 'Company',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        { name: 'logoColour', label: 'Logo Link (Colour)', type: 'string' },
        { name: 'logoWhite', label: 'Logo Link (White)', type: 'string' },
        {
          name: 'active',
          label: 'Active',
          type: 'boolean',
          description: 'Toggle to highlight which company is BY DEFAULT active',
        },
        {
          name: 'isHidden',
          label: 'Hidden',
          type: 'boolean',
          description:
            'Toggle will hide the company item from the list of clickable companies - it will also ensure it cannot be turned off.',
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'string',
          ui: { component: 'color' },
          description: 'Choose a background color for the company',
        },
        { name: 'criteria1', label: 'Criteria 1', type: 'boolean' },
        { name: 'criteria2', label: 'Criteria 2', type: 'boolean' },
        { name: 'criteria3', label: 'Criteria 3', type: 'boolean' },
        { name: 'criteria4', label: 'Criteria 4', type: 'boolean' },
        { name: 'criteria5', label: 'Criteria 5', type: 'boolean' },
        { name: 'criteria6', label: 'Criteria 6', type: 'boolean' },
        { name: 'criteria7', label: 'Criteria 7', type: 'boolean' },
        { name: 'criteria8', label: 'Criteria 8', type: 'boolean' },
        { name: 'criteria9', label: 'Criteria 9', type: 'boolean' },
      ],
    },
  ],
};

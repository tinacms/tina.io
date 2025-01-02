export const CardGridSchema = {
  name: 'cardGrid',
  label: 'Card Grid',
  fields: [
    {
      name: 'cards',
      label: 'Cards',
      type: 'object',
      list: true,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
          ui: {
            component: 'textarea',
          },
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
        },
        {
          name: 'linkText',
          label: 'Button Text',
          type: 'string',
        },
      ],
    },
  ],
};

import { Template } from 'tinacms';

const cardGrid: Template = {
  label: 'Card Grid',
  name: 'cardGrid',
  fields: [
    {
      type: 'object',
      label: 'Cards',
      name: 'cards',
      list: true,
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
        },
        {
          type: 'string',
          label: 'Link Text',
          name: 'linkText',
        },
      ],
    },
  ],
};

export default cardGrid;

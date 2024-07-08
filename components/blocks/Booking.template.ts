import { Template } from 'tinacms';

export const bookingTemplate: Template = {
  label: 'Booking',
  name: 'booking',
  fields: [
    {
      name: 'bookingCard',
      label: 'Booking Card',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item.name,
        }),
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'description', label: 'Description', type: 'string' },
        { name: 'image', label: 'Image', type: 'string' },
        { name: 'url', label: 'URL', type: 'string' },
      ],
    },
  ],
};

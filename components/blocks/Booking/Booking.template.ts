import type { Template } from 'tinacms';

export const bookingTemplate: Template = {
  label: 'Booking',
  name: 'booking',
  ui: {
    previewSrc: '/img/blocks/booking.png',
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
  ],
};

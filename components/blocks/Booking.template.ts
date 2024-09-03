import { Template } from 'tinacms';

export const bookingTemplate: Template = {
  label: 'Booking',
  name: 'booking',
  fields: [
    {name: 'title', label: 'Title', type: 'string'},
    {name: 'description', label: 'Description', type: 'string'},
  ],
};

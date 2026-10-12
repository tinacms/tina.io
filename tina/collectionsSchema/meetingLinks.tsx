export const meetingLinksCollection = {
  name: 'meetingLinks',
  label: 'Meeting Links',
  path: 'content/meeting-links',
  format: 'json',
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
        {
          name: 'image',
          label: 'Image',
          type: 'image',
          description: 'Image headshot for a meeting card',
        },
        {
          name: 'url',
          label: 'URL',
          type: 'string',
          description: 'URL to a meeting link (i.e HubSpot)',
        },
      ],
    },
  ],
};

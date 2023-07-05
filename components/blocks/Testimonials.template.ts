export const testimonialsTemplate = {
  label: 'Testimonials',
  name: 'testimonials',
  ui: {
    previewSrc: '/img/blocks/testimonials.png',
    // defaultItem: {},
  },
  fields: [
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name }
        },
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'username', label: 'Username', type: 'string' },
        {
          name: 'avatar',
          label: 'Avatar',
          type: 'image',
        },
        {
          name: 'date',
          label: 'Date',
          type: 'datetime',
          ui: {
            dateFormat: 'MMMM DD YYYY',
          },
        },
        {
          name: 'testimonial',
          label: 'Testimonial',
          type: 'rich-text',
        },
        { name: 'link', label: 'Link', type: 'string' },
      ],
    },
  ],
}

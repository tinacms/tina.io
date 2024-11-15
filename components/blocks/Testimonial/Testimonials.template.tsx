export const testimonialsTemplate = {
  label: 'Testimonials',
  name: 'testimonials',
  ui: {
    previewSrc: '/img/blocks/testimonials.png',
    defaultItem: {
      title: 'Loved by Devs',
    },
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
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
        { name: 'rhsImage', label: 'Image on the right', type: 'boolean' },
        { name: 'imageBorder', label: 'Circular Image Border', description: 'A la social media account profiles', type: 'boolean' },
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
            parse: (value) => {

              return value ? new Date(value).toISOString() : undefined;
            }
            
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

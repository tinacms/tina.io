export const newsletterTemplate = {
  name: 'newsletter',
  label: 'Newsletter Signup',
  ui: {
    defaultItem: {
      style: 'default',
    },
  },
  fields: [
    {
      name: 'style',
      label: 'Style',
      type: 'string',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Small',
          value: 'small',
        },
      ],
    },
  ],
}

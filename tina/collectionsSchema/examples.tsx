export const examplesCollection = {
  name: 'examples',
  label: 'Examples',
  path: 'content/examples',
  format: 'json',
  match: {
    include: 'index',
  },
  fields: [
    {
      type: 'object',
      name: 'examples',
      label: 'Examples',
      list: true,
      ui: {
        defaultItem: {
          label: 'Tina Tailwind Starter',
          description: {
            type: 'root',
            children: [
              {
                type: 'p',
                children: [
                  {
                    type: 'text',
                    text: 'A full featured starter that uses tailwind and Tinacms',
                  },
                ],
              },
            ],
          },
          image:
            'https://res.cloudinary.com/forestry-demo/image/upload/v1645712511/tina-io/docs/your-blocks.gif',
          link: 'https://github.com/tinacms/tina-cloud-starter',
        },
        itemProps: (item) => {
          // Field values are accessed by title?.<Field name>
          return { label: item.label };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Label',
          name: 'label',
        },
        {
          type: 'rich-text',
          label: 'Description',
          name: 'description',
        },
        {
          type: 'image',
          label: 'Image',
          name: 'image',
        },
        {
          type: 'string',
          label: 'Link',
          name: 'link',
        },
      ],
    },
  ],
};

import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Blog',
      name: 'blog',
      path: 'content/blog',
      templates: [
        {
          name: 'basic',
          label: 'Basic',
          fields: [
            {
              name: 'date',
              type: 'text',
              label: 'Date',
            },
            {
              name: 'author',
              type: 'text',
              label: 'Author',
            },
            {
              name: 'last_edited',
              type: 'text',
              label: 'Last Edited',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'draft',
              type: 'toggle',
              label: 'Draft',
            },
            {
              name: 'prev',
              type: 'text',
              label: 'Prev',
            },
            {
              name: 'next',
              type: 'text',
              label: 'Next',
            },
            {
              name: 'consumes',
              label: 'Consumes',
              type: 'group-list',
              fields: [
                {
                  type: 'text',
                  label: 'File',
                  name: 'file',
                },
                {
                  type: 'text',
                  label: 'Details',
                  name: 'details',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
})

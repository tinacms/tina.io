export const docsCollection = {
  name: 'doc',
  label: 'Docs',
  path: 'content/docs',
  format: 'mdx',
  ui: {
    beforeSubmit: async ({ values, cms, form }) => {
      return {
        ...values,
        last_edited: new Date().toISOString(),
      };
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      type: 'string',
      name: 'last_edited',
      label: 'Last Edited',
      ui: {
        component: 'hidden',
      },
    },
    {
      name: 'next',
      label: 'Next page',
      type: 'reference',
      collections: ['doc', 'examples'],
    },
    {
      name: 'previous',
      label: 'Previous page',
      type: 'reference',
      collections: ['doc', 'examples'],
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
      templates: [
        {
          name: 'Youtube',
          label: 'Youtube Embed',
          fields: [
            {
              type: 'string',
              name: 'embedSrc',
              label: 'Embed URL',
              description:
                '⚠︎ Only YouTube embed URLs work - they look like this https://www.youtube.com/embed/Yoh2c5RUTiY',
            },
          ],
        },
        {
          name: 'GraphQLCodeBlock',
          label: 'GraphQL Code Block',
          fields: [
            {
              type: 'string',
              name: 'query',
              label: 'Query',
              description:
                'Paste GraphQL query here. "#" are auto-inserted as spacing placeholders and should not be used.',
              ui: {
                /* TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 */
                component: 'textarea',
                format: (val?: string) => val && val.replaceAll('#', ' '),
                parse: (val?: string) => val && val.replaceAll(' ', '#'),
              },
            },
            {
              type: 'string',
              name: 'response',
              label: 'Response',
              description:
                'Paste GraphQL response data here. "#" are auto-inserted as spacing placeholders and should not be used.',
              ui: {
                /* TODO - remove as per https://github.com/tinacms/tina.io/issues/2047 */
                component: 'textarea',
                format: (val?: string) => val && val.replaceAll('#', ' '),
                parse: (val?: string) => val && val.replaceAll(' ', '#'),
              },
            },
            {
              type: 'boolean',
              name: 'preselectResponse',
              label: 'Select Response by Default',
              description: 'Select the response tab by default',
            }
          ],
        },
        {
          name: 'WarningCallout',
          label: 'Warning Callout',
          fields: [
            {
              name: 'body',
              label: 'Body',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
          ],
        },
        {
          name: 'Iframe',
          label: 'Embeded an Iframe',
          fields: [
            { name: 'iframeSrc', type: 'string' },
            {
              name: 'height',
              type: 'number',
              label: 'Height',
              description: 'The hight of the iframe (in px) ',
            },
          ],
        },
        {
          name: 'CloudinaryVideo',
          label: 'Cloudinary Video',
          fields: [
            {
              type: 'string',
              name: 'src',
              label: 'Cloudinary URL',
              description: 'Full URL with no file extension',
            },
          ],
        },
        {
          name: 'ImageAndText',
          label: 'Image and Text',
          fields: [
            {
              name: 'docText',
              label: 'docText',
              isBody: true,
              type: 'rich-text',
              description:
                'DO NOT USE THIS TEMPLATE WHILST YOU SEE THIS MESSAGE //TODO: #1967',
            },
            {
              name: 'image',
              label: 'image',
              type: 'image',
            },
          ],
        },
        {
          name: 'SummaryTab',
          label: 'Summary Tab',
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'string',
              description:
                'DO NOT USE THIS TEMPLATE WHILST YOU SEE THIS MESSAGE //TODO: #1967',
            },
            {
              name: 'text',
              label: 'text',
              isBody: true,
              type: 'rich-text',
            },
          ],
        },
      ],
    },
  ],
};

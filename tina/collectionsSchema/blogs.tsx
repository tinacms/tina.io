import { seoInformation } from './sharedFields/seoInformation';

export const blogsCollection = {
  name: 'post',
  label: 'Blog Posts',
  path: 'content/blog',
  format: 'mdx',
  fields: [
    {
      ...seoInformation,
      description:
        'Meta Information – if not set, the meta description will be set to a standard default, and title to "Title | Tina Blogs" per the field below',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
      list: false,
      ui: {
        validate: (value) => {
          if (value?.length > 70) {
            return 'Title can not be more then 70 characters long';
          }
        },
      },
    },
    {
      // note: default to current date/time
      type: 'string',
      name: 'date',
      label: 'Date Created',
      ui: {
        component: 'date',
      },
    },
    {
      // note: this should be a hidden field that auto-updates
      type: 'string',
      name: 'last_edited',
      label: 'Last Edited',
      ui: {
        component: 'date',
      },
    },
    {
      // TODO create an authors collection and make this a relation field
      type: 'string',
      name: 'author',
      label: 'Author',
    },
    {
      type: 'reference',
      name: 'prev',
      label: 'Previous Post',
      description:
        '(Optional) link to an earlier post at the bottom of this one',
      collections: ['post'],
    },
    {
      type: 'reference',
      name: 'next',
      label: 'Next Post',
      description: '(Optional) link to a later post at the bottom of this one',
      collections: ['post'],
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Body',
      isBody: true,
      parser: {
        type: 'mdx',
      },
      templates: [
        {
          name: 'WarningCallout',
          label: 'Warning Callout',
          fields: [
            {
              name: 'body',
              label: 'Body',
              type: 'rich-text',
            },
          ],
        },
        {
          name: 'apiReference',
          label: 'API Reference',
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Title',
            },
            {
              type: 'object',
              name: 'property',
              label: 'Property',
              list: true,
              ui: {
                itemProps: (item) => {
                  return {
                    label: item.groupName
                      ? `${item.groupName} - ${item.name}`
                      : item.name,
                  };
                },
              },
              fields: [
                {
                  type: 'string',
                  name: 'groupName',
                  label: 'Group Name',
                  description:
                    'Adjacent properties with the same group name will be grouped together',
                },
                {
                  type: 'string',
                  name: 'name',
                  label: 'Name',
                },
                {
                  type: 'rich-text',
                  name: 'description',
                  label: 'Description',
                },
                {
                  type: 'string',
                  name: 'type',
                  label: 'Type',
                },
                {
                  type: 'string',
                  name: 'default',
                  label: 'Default',
                },
                {
                  type: 'boolean',
                  name: 'required',
                  label: 'Required',
                },
                {
                  type: 'boolean',
                  name: 'experimental',
                  label: 'Experimental',
                },
              ],
            },
          ],
        },
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
          name: 'WebmEmbed',
          label: 'Webm Embed',
          fields: [
            {
              type: 'string',
              name: 'embedSrc',
              label: 'Embed SRC',
            },
            {
              type: 'string',
              name: 'width',
              label: 'width',
            },
          ],
        },
        {
          name: 'GraphQLCodeBlock',
          label: 'GraphQL Code Block',
          fields: [
            {
              type: 'rich-text',
              name: 'request',
              label: 'Request',
              description: 'Paste GraphQL request code here.',
            },
            {
              type: 'rich-text',
              name: 'response',
              label: 'Response',
              description: 'Paste GraphQL response data here.',
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
          name: 'CreateAppCta',
          label: '"Create Tina App" Call-to-action',
          fields: [
            {
              type: 'string',
              name: 'ctaText',
              label: 'Button Text',
            },
            {
              type: 'string',
              name: 'cliText',
              label: 'CLI Command Example',
            },
          ],
        },
        {
          name: 'Callout',
          label: 'Callout',
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Title',
            },
            {
              type: 'string',
              name: 'description',
              label: 'Description',
            },
            {
              type: 'string',
              name: 'url',
              label: 'URL',
            },
            {
              type: 'string',
              name: 'buttonText',
              label: 'Button Text',
            },
          ],
        },
        {
          name: 'Codesandbox',
          label: 'Codesandbox embed',
          fields: [
            {
              type: 'string',
              name: 'embedSrc',
              label: 'Embed URL',
            },
            {
              type: 'string',
              name: 'title',
              label: 'A11y Title',
            },
          ],
        },
        {
          name: 'Diagram',
          label: 'Diagram',
          fields: [
            {
              type: 'string',
              name: 'src',
            },
            {
              type: 'string',
              name: 'alt',
            },
          ],
        },
        {
          name: 'WideImage',
          label: 'Wide Image',
          fields: [
            {
              type: 'image',
              name: 'src',
            },
            {
              type: 'string',
              name: 'alt',
            },
          ],
        },
        {
          name: 'CustomFieldComponentDemo',
          label: 'Field Component Demo [do not use]',
          fields: [{ type: 'string', name: 'test' }],
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
          name: 'Button',
          label: 'Button',
          fields: [
            {
              type: 'string',
              name: 'label',
              label: 'Label',
            },
            {
              type: 'string',
              name: 'link',
              label: 'Link',
            },
          ],
        },
      ],
    },
  ],
};

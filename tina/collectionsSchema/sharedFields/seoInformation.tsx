import { TextInputWithCount } from '../../customTinaFormFields/textInputWithCount';

export const seoInformation = {
  type: 'object',
  label: 'SEO Values',
  name: 'seo',
  fields: [
    {
      type: 'string',
      label: 'Meta - Title',
      description: 'Recommended limit of 70 characters',
      name: 'title',
      ui: {
        validate: (value) => {
          if (value && value.length > 70) {
            return 'Title should be 70 characters or less';
          }
        },
        component: TextInputWithCount(70),
      },
    },
    {
      type: 'string',
      label: 'Meta - Description',
      description: 'Recommended limit of 150 characters',
      name: 'description',
      component: 'textarea',
      ui: {
        component: TextInputWithCount(150, true),
      },
    },
    {
      type: 'string',
      label: 'Canonical URL',
      name: 'canonicalUrl',
      description: 'Default URL if no URL is provided',
    },
    {
      type: 'image',
      label: 'Open Graph Image',
      name: 'ogImage',
      uploadDir: () => 'og',
      description: 'Default image if no image is provided',
    },
  ],
};

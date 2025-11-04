import type { Template } from 'tinacms';

export const footerLinkContentTemplate: Template = {
  label: 'Footer Link Content',
  name: 'footerLinkContent',
  ui: {
    previewSrc: '/img/blocks/content.png',
    defaultItem: {
      title: 'Page Title',
      byLine: 'Add your content here...',
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'byLine',
      label: 'ByLine',
      type: 'rich-text',
    },
  ],
};

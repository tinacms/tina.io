import { Template } from 'tinacms';

import { actionsButtonTemplate } from './ActionsButton.template';
import { newsletterTemplate } from './Newsletter.template';
import { socialTemplate } from './Social.template';

export const contentTemplate: Template = {
  label: 'Content',
  name: 'content',
  ui: {
    previewSrc: '/img/blocks/content.png',
  },
  fields: [
    {
      name: 'options',
      label: 'Options',
      type: 'object',
      fields: [
        {
          name: 'narrow',
          label: 'Narrow',
          type: 'boolean',
        },
        {
          name: 'color',
          label: 'Color',
          type: 'string',
          options: [
            {
              label: 'Seafoam',
              value: 'seafoam',
            },
            {
              label: 'White',
              value: 'white',
            },
          ],
        },
        {
          name: 'align',
          label: 'Align Content',
          type: 'string',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
        },
      ],
    },
    {
      name: 'content',
      label: 'Content',
      type: 'rich-text',
      parser: {
        type: 'mdx',
      },
      templates: [
        // @ts-ignore
        actionsButtonTemplate,
        // @ts-ignore
        socialTemplate,
        // @ts-ignore
        newsletterTemplate,
      ],
    },
  ],
};

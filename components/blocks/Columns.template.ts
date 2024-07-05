import type { TinaTemplate } from 'tinacms'
import { actionsButtonTemplate } from './ActionsButton.template'
import { socialTemplate } from './Social.template'
import { newsletterTemplate } from './Newsletter.template'

export const columnsTemplate: TinaTemplate = {
  label: 'Columns',
  name: 'columns',
  ui: {
    previewSrc: '/img/blocks/columns.png',
  },
  fields: [
    {
      name: 'options',
      label: 'Options',
      type: 'object',
      fields: [
        {
          name: 'columns',
          label: 'Column Sizes',
          type: 'string',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Not Default',
              value: 'notDefault',
            },
          ],
        },
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
      name: 'columnOne',
      label: 'Column One',
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
    {
      name: 'columnTwo',
      label: 'Column Two',
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
}

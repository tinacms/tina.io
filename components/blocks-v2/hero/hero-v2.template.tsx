import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '@/component/blocks/ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '@/component/blocks/CodeButton/CodeButton.template';
import { modalButtonTemplate } from '@/component/blocks/ModalButton/ModalButton.template';
import { IconPickerInput } from '@/component/forms/IconPicker';
import type React from 'react';

export const herov2Template: Template = {
  name: 'heroV2',
  label: 'V2 | Hero',
  ui: {
    previewSrc: '/img/blocks/hero-v2.png',
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      name: 'subtext',
      type: 'string',
      label: 'Subtext',
      ui: {
        component: 'textarea',
      },
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true,
        min: 0,
        max: 3,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
    {
      name: 'buttonHorizontalAlignment',
      type: 'string',
      label: 'Button Horizontal Alignment',
      options: ['left', 'center', 'right'],
      ui: {
        component: 'select',
      },
    },
    {
      name: 'image',
      type: 'image',
      label: 'Image',
    },
    {
      name: 'recentNewsBanner',
      type: 'object',
      label: 'Recent News Banner',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
        },
        {
          name: 'openInNewTab',
          label: 'Open in New Tab',
          type: 'boolean',
        },
        {
          name: 'badge',
          label: 'Badge',
          type: 'object',
          fields: [
            {
              name: 'text',
              label: 'Badge Text',
              type: 'string',
              required: false,
              description: 'Text to display in the badge. If empty, badge will not show.'
            },
            {
              ui: {
                component: IconPickerInput as React.FC<{field: unknown}>,
              },
              name: 'icon',
              label: 'Icon',
              type: 'string',
              required: false,
              description: 'Icon to display in the banner. Leave empty for no icon.'
            },
            {
              name: 'position',
              label: 'Badge Position',
              type: 'string',
              options: [
                  { value: 'left', label: 'Left (inline)' },
                  { value: 'right', label: 'Right (inline)' },
                  { value: 'top left', label: 'Top Left (anchored)' },
                  { value: 'top right', label: 'Top Right (anchored)' },
              ],
              ui: {
                component: 'select',
              },
              required: false,
              description: 'Position of the badge: inline left/right or anchored top left/right',
            },
          ],
        },
      ],
    },
  ],
};

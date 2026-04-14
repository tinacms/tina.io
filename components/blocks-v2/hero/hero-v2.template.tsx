import type React from 'react';
import type { Template } from 'tinacms';
import { BADGE_COLOR_OPTIONS } from '@/component/Badge/Badge.template';
import { actionsButtonTemplate } from '@/component/blocks/ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '@/component/blocks/CodeButton/CodeButton.template';
import { modalButtonTemplate } from '@/component/blocks/ModalButton/ModalButton.template';
import { IconPickerInput } from '@/component/forms/IconPicker';

export const herov2Template: Template = {
  name: 'heroV2',
  label: 'V2 | Hero',
  ui: {
    previewSrc: '/img/blocks/hero-v2.png',
  },
  fields: [
    {
      name: 'slides',
      label: 'Slides',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.title || 'Untitled Slide',
        }),
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
          name: 'secondaryImage',
          type: 'image',
          label: 'Secondary Image',
          description:
            'Optional overlay image (e.g., llama peeking over terminal)',
        },
        {
          name: 'layout',
          type: 'string',
          label: 'Layout',
          options: [
            { value: 'default', label: 'Content Left / Image Right' },
            { value: 'reversed', label: 'Image Left / Content Right' },
          ],
          ui: {
            component: 'select',
          },
        },
        {
          name: 'showTerminal',
          type: 'boolean',
          label: 'Show Terminal Panel',
          description:
            'Render a terminal mockup instead of a plain image on the image side',
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
                  description:
                    'Text to display in the badge. If empty, badge will not show.',
                },
                {
                  ui: {
                    component: IconPickerInput as React.FC<{
                      field: unknown;
                    }>,
                  },
                  name: 'icon',
                  label: 'Icon',
                  type: 'string',
                  required: false,
                  description:
                    'Icon to display in the badge. Leave empty for no icon.',
                },
                {
                  name: 'position',
                  label: 'Badge Position',
                  type: 'string',
                  options: [
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' },
                    { value: 'top left', label: 'Top Left' },
                    { value: 'top right', label: 'Top Right' },
                  ],
                  ui: {
                    component: 'select',
                  },
                  required: false,
                  description: 'Position of the badge on the banner',
                },
                {
                  name: 'color',
                  label: 'Badge Color',
                  type: 'string',
                  options: BADGE_COLOR_OPTIONS,
                  ui: {
                    component: 'select',
                  },
                  required: false,
                  description: 'Color variant for the badge',
                },
              ],
            },
            {
              ui: {
                component: IconPickerInput,
              },
              name: 'titleIcon',
              label: 'Title Icon',
              type: 'string',
              required: false,
              description:
                'Icon to display next to the banner title. Leave empty for no icon.',
            },
            {
              name: 'backgroundColor',
              label: 'Background Color',
              type: 'string',
              options: BADGE_COLOR_OPTIONS,
              ui: {
                component: 'select',
              },
              required: false,
              description: 'Background color for the recent news banner',
            },
          ],
        },
        {
          name: 'featureTags',
          type: 'object',
          label: 'Feature Tags',
          list: true,
          ui: {
            itemProps: (item) => ({
              key: item.id,
              label: item.label || 'Tag',
            }),
          },
          fields: [
            {
              name: 'label',
              type: 'string',
              label: 'Label',
            },
          ],
        },
      ],
    },
    {
      name: 'autoplaySpeed',
      type: 'number',
      label: 'Autoplay Speed (ms)',
      description: 'Time between auto-advance in milliseconds. Default: 8000',
    },
  ],
};

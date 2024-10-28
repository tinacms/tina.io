import type { Template } from 'tinacms';
import { actionsButtonTemplate } from './ActionsButton.template';

export const roadmapGridTemplate: Template = {
  label: 'Roadmap Grid',
  name: 'roadmapGrid',
  ui: {
    previewSrc: '/img/blocks/roadmap.png',
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'items',
      label: 'Roadmap Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        { name: 'status', label: 'Status', type: 'string' },
        {
          name: 'content',
          label: 'Content',
          type: 'rich-text',
        },
        // @ts-ignore
        actionsButtonTemplate as any,
      ],
    },
    {
      name: 'options',
      label: 'Options',
      type: 'object',
      fields: [
        { name: 'paddingTop', label: 'Top Padding', type: 'boolean' },
        { name: 'paddingBottom', label: 'Bottom Padding', type: 'boolean' },
      ],
    },
  ],
};

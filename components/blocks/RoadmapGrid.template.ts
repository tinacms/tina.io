import type { TinaTemplate } from '@tinacms/cli'
import { actionsTemplate } from './Actions.template'

export const roadmapGridTemplate: TinaTemplate = {
  label: 'Roadmap Grid',
  name: 'roadmapGrid',
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
        actionsTemplate as any,
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
}

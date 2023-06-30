import type { TinaTemplate } from 'tinacms'
import { actionsTemplate } from './Actions.template'

export const featureGridTemplate: TinaTemplate = {
  label: 'Feature Grid',
  name: 'featureGrid',
  ui: {
    previewSrc: '/img/blocks/feature-grid.png',
  },
  fields: [
    {
      name: 'items',
      label: 'Feature Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      // @ts-ignore
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'text',
          label: 'Text',
          ui: { component: 'textarea' },
          type: 'string',
        },
        // @ts-ignore
        actionsTemplate,
      ],
    },
  ],
}

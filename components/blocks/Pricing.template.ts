import * as React from 'react'

import type { TinaTemplate } from 'tinacms'

import { actionsButtonTemplate } from './ActionsButton.template'

export const cardTemplate: TinaTemplate = {
  name: 'card',
  label: 'Card',
  //@ts-ignore
  type: 'object',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'string',
    },
    {
      name: 'interval',
      label: 'Interval',
      type: 'string',
    },
    {
      name: 'body',
      label: 'Body',
      type: 'rich-text',
    },
    // @ts-ignore
    actionsButtonTemplate,
  ],
}

export const pricingTemplate: TinaTemplate = {
  name: 'pricing',
  label: 'Pricing',
  ui: {
    previewSrc: '/img/blocks/pricing.png',
    defaultItem: {
      intro:
        '**No surprises. **Predictable pricing for every project. Complete control of your content, forever.\n\nTina’s source code is open-source. Your content lives in accessible formats right in your Git repository.\n',
    },
  },
  fields: [
    {
      name: 'intro',
      label: 'Intro Text',
      type: 'rich-text',
    },
    {
      name: 'base',
      label: 'Base Plan',
      // @ts-ignore
      type: cardTemplate.type,
      fields: cardTemplate.fields,
    },
    {
      name: 'plans',
      label: 'Pricing Plans',
      // @ts-ignore
      type: cardTemplate.type,
      list: true,
      fields: cardTemplate.fields,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: {
          name: 'Pricing Tier',
          price: '$99',
          interval: 'month',
        },
      },
    },
  ],
}

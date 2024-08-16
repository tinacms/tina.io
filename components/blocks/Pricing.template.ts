import * as React from 'react'

import type { Template } from 'tinacms'

import { actionsButtonTemplate } from './ActionsButton.template'
import { modalButtonTemplate } from './ModalButton.template'
import { codeButtonTemplate } from './CodeButton.template'
import IconSelector from './IconSelector'

export const cardTemplate: Template = {
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
      name: 'description',
      label: 'Description',
      type: 'rich-text',
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
      name: 'cardItem',
      label: 'Card Item',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
      },
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'string',
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'string',
          ui : {
            component: IconSelector
          }
        }

      ]
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
    {
      name: 'isStarred',
      label: 'Is Starred?',
      type: 'boolean',
      description: 'Enabling this will add a star to the pricing block',
    }
  ],
}

export const pricingTemplate: Template = {
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
      name: 'headline',
      label: 'Headline',
      type: 'string',
    },
    {
      name: 'freeTier',
      label: 'Free Tier',
      type: 'object',
      fields: cardTemplate.fields,
    },
    {
      name: 'intro',
      label: 'Intro Text',
      type: 'rich-text',
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

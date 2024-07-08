import type { Template } from 'tinacms'
import { actionsButtonTemplate } from './ActionsButton.template'
import { modalButtonTemplate } from './ModalButton.template'
import { codeButtonTemplate } from './CodeButton.template'

export const flyingTemplate: Template = {
  name: 'flying',
  label: 'Flying',
  ui: {
    previewSrc: '/img/blocks/flying.png',
  },
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'text',
      label: 'Text',
      ui: { component: 'textarea' },
      type: 'string',
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
  ],
}

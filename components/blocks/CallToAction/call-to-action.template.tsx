import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '../CodeButton/CodeButton.template';
import { modalButtonTemplate } from '../ModalButton/ModalButton.template';

export const callToActionTemplate: Template = {
  label: 'Call to Action',
  name: 'callToAction',
  ui: {
    previewSrc: '/img/blocks/call-to-action.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
    },
    {
      label: 'Buttons',
      list: true,
      name: 'buttons',
      type: 'object',
      ui: {
        visualSelector: true,
        min: 0,
        max: 2,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
  ],
};
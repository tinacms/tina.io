import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '@/component/blocks/ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '@/component/blocks/CodeButton/CodeButton.template';
import { modalButtonTemplate } from '@/component/blocks/ModalButton/ModalButton.template';

export const herov2Template: Template = {
  name: 'heroV2',
  label: 'V2 | Hero',
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
      name: 'image',
      type: 'image',
      label: 'Image',
    },
  ],
};

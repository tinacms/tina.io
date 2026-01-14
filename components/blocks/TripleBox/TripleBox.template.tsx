import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '../CodeButton/CodeButton.template';
import { modalButtonTemplate } from '../ModalButton/ModalButton.template';

export const tripleBoxTemplate = {
  label: 'Triple Box',
  name: 'tripleBox',
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'tagLine',
      label: 'tagLine',
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
        max: 1,
      },
      templates: [
        actionsButtonTemplate as Template,
        modalButtonTemplate as Template,
        codeButtonTemplate as Template,
      ],
    },
    {
      name: 'boxes',
      label: 'Boxes',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
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
          ui: { component: 'textarea' },
        },
        {
          name: 'image',
          label: 'Image',
          type: 'image',
        },
        {
          name: 'link',
          label: 'Link',
          type: 'string',
        },
      ],
    },
  ],
};

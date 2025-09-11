import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '@/component/blocks/ActionButton/ActionsButton.template';
import { codeButtonTemplate } from '@/component/blocks/CodeButton/CodeButton.template';
import { modalButtonTemplate } from '@/component/blocks/ModalButton/ModalButton.template';

export const featureCardTemplate: Template = {
  name: 'featureCard',
  label: 'Feature Card',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'sectionEyebrow',
      label: 'Section Eyebrow',
      type: 'string',
    },
    {
      name: 'cards',
      label: 'Cards',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          name: 'textOnRight',
          label: 'Text On Right',
          type: 'boolean',
        },
        {
          name: 'themeColour',
          label: 'Theme Colour',
          type: 'string',
          options: ['black', 'blue', 'tinaOrange'],
        },
        {
          name: 'title',
          label: 'Title',
          type: 'string',
        },
        {
          name: 'featureHeadline',
          label: 'Feature Headline',
          type: 'string',
        },
        {
          name: 'featureText',
          label: 'Feature Text',
          type: 'string',
          ui: { component: 'textarea' },
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
    },
  ],
};

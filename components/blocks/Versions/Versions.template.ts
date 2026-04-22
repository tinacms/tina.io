import type { Template } from 'tinacms';
import { actionsButtonTemplate } from '../ActionButton/ActionsButton.template';

export const versionsTemplate: Template = {
  label: 'Versions',
  name: 'versions',
  ui: {
    previewSrc: '/img/blocks/versions.png',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      description:
        'Heading shown above the live table of TinaCMS package versions.',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      ui: {
        component: 'textarea',
      },
      description:
        'Short paragraph shown under the heading. Leave blank to hide.',
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'object',
      list: true,
      description:
        'Optional links shown under the description — e.g. to changesets or release notes.',
      ui: {
        visualSelector: true,
      },
      templates: [actionsButtonTemplate as Template],
    },
  ],
};

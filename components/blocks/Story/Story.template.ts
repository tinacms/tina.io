import type { Template } from 'tinacms';

export const storyTemplate: Template = {
  label: '<zzz>Story',
  name: 'story',
  ui: {
    previewSrc: '/img/blocks/story.png',
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
};

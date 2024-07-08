import type { Template } from 'tinacms'

export const storyTemplate: Template = {
  label: 'Story',
  name: 'story',
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
}

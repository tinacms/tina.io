import type { TinaTemplate } from 'tinacms'

export const storyTemplate: TinaTemplate = {
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

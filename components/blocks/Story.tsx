import React from 'react'
import type { TinaTemplate } from '@tinacms/cli'

export const storyTemplate: TinaTemplate = {
  label: 'Story',
  name: 'story',
  ui: {
    previewSrc: '/img/blocks/hero.png',
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
  ],
}

export function StoryBlock({ data, index }) {
  return (
      <section key={index} className={``}>
        <h1>Hello World</h1>
      </section>
  )
}

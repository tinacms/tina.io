import React from 'react'
import { DocsTextWrapper } from '../layout/DocsTextWrapper'
import { Wrapper } from '../layout/Wrapper'
import { Section } from '../layout/Section'
import { Actions, actionsTemplate } from './Actions'
import { SocialBlock, socialTemplate } from './Social'
import type { TinaTemplate } from '@tinacms/cli'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const contentTemplate: TinaTemplate = {
  label: 'Content',
  name: 'content',
  ui: {
    previewSrc: '/img/blocks/content.png',
  },
  fields: [
    {
      name: 'options',
      label: 'Options',
      type: 'object',
      fields: [
        {
          name: 'narrow',
          label: 'Narrow',
          type: 'boolean',
        },
        {
          name: 'color',
          label: 'Color',
          type: 'string',
          options: [{
            label: 'Seafoam',
            value: 'seafoam'
          }, {
            label: 'White',
            value: 'white'
          }]
        },
        {
          name: 'align',
          label: 'Align Content',
          type: 'string',
          options: [{
            label: 'Left',
            value: 'left'
          }, {
            label: 'Center',
            value: 'center'
          }, {
            label: 'Right',
            value: 'right'
          }]
        }
      ]
    },
    {
      name: 'content',
      label: 'Content',
      type: 'rich-text',
      templates: [
        // @ts-ignore
        actionsTemplate,
        // @ts-ignore
        socialTemplate,
      ],
    },
  ],
}

export const contentComponents = {
  actions: Actions, 
  social: SocialBlock,
}

export function ContentBlock({ data, index }) {
  return (
    <Section color={data.options?.color || 'white'}>
      <DocsTextWrapper>
        <Wrapper align={data.options?.align || 'left'} narrow={data.options?.narrow || false} >
          {data.content && <TinaMarkdown components={contentComponents} content={data.content} />}
        </Wrapper>
      </DocsTextWrapper>
    </Section>
  )
}

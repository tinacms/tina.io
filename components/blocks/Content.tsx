import React from 'react'
import { DocsTextWrapper } from '../layout/DocsTextWrapper'
import { Wrapper } from '../layout/Wrapper'
import { Section } from '../layout/Section'
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
      name: 'narrow',
      label: 'Narrow',
      type: 'boolean',
    },
    {
      name: 'seafoam',
      label: 'Seafoam',
      type: 'boolean',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'rich-text',
      templates: [
        {
          name: 'code',
          label: 'Code',
          fields: [
            {
              type: 'string',
              name: 'language',
              label: 'Language',
            },
            {
              type: 'string',
              name: 'code',
              label: 'Code',
            },
          ],
        },
      ],
    },
  ],
}

export function ContentBlock({ data, index }) {
  return (
    <>
      <Section color={data.seafoam ? 'seafoam' : 'white'}>
        <DocsTextWrapper>
          <Wrapper narrow={data.narrow} >
            {data.content && <TinaMarkdown content={data.content} />}
          </Wrapper>
        </DocsTextWrapper>
      </Section>
      <style jsx>{`
        .section {
          padding: 3rem 0;

          @media (min-width: 800px) {
            padding: 5rem 0;
          }
        }
      `}</style>
    </>
  )
}

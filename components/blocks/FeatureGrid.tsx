import React from 'react'
import type { TinaTemplate } from '@tinacms/cli'
import { Container } from './Container'
import { actionsTemplate, Actions } from './Actions'

export const featureGridTemplate: TinaTemplate = {
  label: 'Feature Grid',
  name: 'featureGrid',
  fields: [
    {
      name: 'items',
      label: 'Feature Items',
      type: 'object',
      list: true,
      templates: [
        {
          label: 'Feature',
          name: 'feature',
          fields: [
            { name: 'headline', label: 'Headline', type: 'string' },
            {
              name: 'text',
              label: 'Text',
              ui: { component: 'textarea' },
              type: 'string',
            },
            // @ts-ignore
            actionsTemplate,
          ],
        },
      ],
    },
  ],
}

const Feature = ({ data, index }) => {
  return <div className=""></div>
}

export function FeatureGridBlock({ data, index }) {
  return (
    <section
      key={'features-' + index}
      className={'section white featureSection'}
    >
      <Container>
        {/* TODO: why is there a type error here */}
        {/* @ts-ignore */}
        {data.items &&
          data.items.map((data, index) => {
            return <Feature data={data} index={index} />
          })}
      </Container>
    </section>
  )
}

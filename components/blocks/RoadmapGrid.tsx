import React from 'react'
import type { TinaTemplate } from '@tinacms/cli'
import { Container } from './Container'
import { actionsTemplate, Actions } from './Actions'
import GradGlow from '../../public/svg/grad-glow.svg'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

export const roadmapGridTemplate: TinaTemplate = {
  label: 'Roadmap Grid',
  name: 'roadmapGrid',
  fields: [
    { name: 'headline', label: 'Headline', type: 'string' },
    {
      name: 'items',
      label: 'Roadmap Items',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.headline,
        }),
      },
      fields: [
        { name: 'headline', label: 'Headline', type: 'string' },
        {
          name: 'content',
          label: 'Content',
          type: 'rich-text',
        },
        // @ts-ignore
        actionsTemplate,
      ],
    },
  ],
}

const Roadmap = ({ data, index }) => {
  return (
    <div className="py-6 px-8 md:py-9 md:px-11 lg:py-12 lg:px-14 rounded-sm bg-gradient-to-br from-white via-white to-white/50 flex flex-col gap-4 shadow-[inset_0_0_0_1px_rgba(223,219,252,0.15),_0_0_1px_1px_rgba(223,219,252,0.5)]">
      {data.headline && (
        <h3 className="text-2xl lg:text-3xl font-tuner lg:leading-tight bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent mb-2">
          {data.headline}
        </h3>
      )}
      {data.content && <TinaMarkdown content={data.content} />}
      {data.actions && <Actions items={data.actions} />}
    </div>
  )
}

export function RoadmapGridBlock({ data, index }) {
  return (
    <section
      key={'roadmap-grid-' + index}
      className={'relative z-10 py-16 lg:py-24'}
    >

      <Container width="wide">
      <h3 className="text-3xl lg:text-4xl font-tuner lg:leading-tight bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent mb-2">
      {data.headline}
      </h3>
        <div className="grid gap-[0.5px] grid-flow-row grid-cols-auto-sm md:grid-cols-auto-lg auto-rows-auto w-full rounded-xl overflow-hidden shadow border border-blue-50/50 bg-gradient-to-br from-seafoam-200/30 to-blue-100/30">
          {data.items &&
            data.items.map((data, index) => {
              return <Roadmap data={data} index={index} />
            })}
        </div>
      </Container>
      <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" />
    </section>
  )
}
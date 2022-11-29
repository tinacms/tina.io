import React from 'react'
import { Container } from './Container'
import { Actions } from './Actions'
import GradGlow from '../../public/svg/grad-glow.svg'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { spawn } from 'child_process'

const Roadmap = ({ data, last = false, index }) => {
  return (
    <div className="px-6 flex items-stretch w-full gap-8">
      <div className="flex-0 flex flex-col items-center">
        <div className="flex-shrink-0 w-[2px] h-12 bg-gradient-to-t from-blue-700 to-blue-400"></div>
        <div className="flex-shrink-0 relative w-4 h-4 rounded-full border-2 border-blue-700">
          <div className="h-[2px] w-6 absolute top-1/2 left-full -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-400"></div>
        </div>
        {!last && (
          <div className="w-[2px] h-full bg-gradient-to-b from-blue-700 to-blue-400"></div>
        )}
        {last && (
          <div className="w-[2px] h-2/3 bg-gradient-to-b from-blue-600 via-blue-500/30 to-blue-400/0"></div>
        )}
      </div>
      <div className="flex-1 pt-10 pb-4 flex flex-col items-start gap-4">
        {data.headline && (
          <h3 className="text-2xl lg:text-3xl font-tuner lg:leading-tight bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent">
            {data.headline}
          </h3>
        )}
        {data.content && <TinaMarkdown content={data.content} />}
        {data.status && (
          <span className="rounded-full w-auto flex-grow-0 flex items-center font-tuner whitespace-nowrap leading-snug text-blue-800 px-4 pt-[7px] pb-[5px] text-sm font-medium border border-blue-100 bg-gradient-to-br from-white to-blue-50">
            {data.status}
          </span>
        )}
        {data.actions && <Actions items={data.actions} />}
      </div>
    </div>
  )
}

export function RoadmapGridBlock({ data, index }) {
  return (
    <section
      key={'roadmap-grid-' + index}
      className={`${
        data.options && data.options.paddingTop ? 'pt-16 lg:pt-24' : ''
      } ${data.options && data.options.paddingBottom ? 'pb-16 lg:pb-24' : ''}`}
    >
      <Container width="narrow">
        <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
          {data.headline}
        </h3>
        <div className="">
          {data.items &&
            data.items.map((itemData, index) => {
              const last = data.items.length - 1 === index
              return <Roadmap data={itemData} last={last} index={index} />
            })}
        </div>
      </Container>
      {/* <GradGlow className="absolute w-full h-auto bottom-0 left-0 -z-1" /> */}
    </section>
  )
}

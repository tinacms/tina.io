import React from 'react'
import type { TinaTemplate } from '@tinacms/cli'
import { Container } from './Container'
import { useWindowWidth } from '@react-hook/window-size'

export const logoGridTemplate: TinaTemplate = {
  label: 'Logo Grid',
  name: 'logoGrid',
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'items',
      label: 'Logos',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
      },
      fields: [
        { name: 'name', label: 'Name', type: 'string' },
        { name: 'logo', label: 'Logo Link', type: 'string' },
        { name: 'size', label: 'Size', type: 'number' },
      ],
    },
  ],
}

const Logo = ({ data, index, windowWidth = 1000 }) => {
  const scaleFactor = windowWidth > 1200 ? 1 : windowWidth > 600 ? 0.75 : 0.5

  return (
    <img
      src={data.logo}
      className={`h-auto`}
      style={{ width: data.size ? data.size * scaleFactor : 200 * scaleFactor }}
      alt={data.name}
    />
  )
}

export function LogoGridBlock({ data, index }) {
  const windowWidth = useWindowWidth()

  return (
    <section
      key={'feature-grid-' + index}
      className={
        'relative z-10 py-16 lg:py-24 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-1000'
      }
    >
      <Container width="wide">
        {data.title && (
          <h3 className="font-tuner block text-center text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-white via-white/80 to-white/50 bg-clip-text text-transparent mb-6">
            {data.title}
          </h3>
        )}
        <div className="w-full flex items-center flex-wrap justify-center gap-12 md:gap-16 lg:gap-20">
          {data.items &&
            data.items.map((data, index) => {
              return (
                <Logo data={data} index={index} windowWidth={windowWidth} />
              )
            })}
        </div>
      </Container>
    </section>
  )
}

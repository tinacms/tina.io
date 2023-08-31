import React from 'react'
import { tinaField } from 'tinacms/dist/react'

export const QuoteBlock = ({ data, index }) => {
  return (
    <>
      <section className="py-12 lg:py-16 text-3xl lg:text-4xl font-tuner lg:leading-tight bg-gradient-to-br from-blue-700/80 via-blue-900/90 to-blue-1000 bg-clip-text text-transparent mb-2">
        <h1 data-tina-field={tinaField(data, 'title2')}>{data.title2}</h1>
      </section>
    </>
  )
}

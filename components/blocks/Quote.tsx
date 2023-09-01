import React from 'react'
import { tinaField } from 'tinacms/dist/react'

export const QuoteBlock = ({ data, index }) => {
  return (
    <>
      <section className="relative z-10 py-20 lg:py-28">
        <div className="container wide flex flex-col-reverse items-center lg:justify-center gap-12 perspective lg:flex-row">
          <div className="lg:w-2/5 flex flex-col gap-6 lg:gap-8">
            <img src={data.logo} />
          </div>
          <div className="min-w-0 lg:w-1/2 ">
            <h2 className="text-xl mb-2" data-tina-field={tinaField(data, 'title2')}>{data.title2}</h2>
            <p data-tina-field={tinaField(data, 'subtext')}>{data.subtext}</p>
          </div>
        </div>
      </section>
    </>
  )
}

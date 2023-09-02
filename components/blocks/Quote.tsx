import React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Container } from './Container'

export const QuoteBlock = ({ data, index }) => {
  return (
    <>
      <section
        className="relative z-10 py-16 lg:py-24  bg-[url('/svg/orange-bg.svg')] bg-cover bg-center text-white">
        <Container width="wide">
          <div className="flex flex-col items-center lg:justify-center gap-12 lg:gap-36 perspective lg:flex-row">
            <div className="lg:w-1/5 flex flex-col gap-6 lg:gap-8  max-w-sm">
              <img src={data.logo} />
            </div>
            <div className="min-w-0 lg:w-1/2 ">
              <h2 className="text-xl mb-2" data-tina-field={tinaField(data, 'title2')}>{data.title2}</h2>
              <p data-tina-field={tinaField(data, 'subtext')}>{data.subtext}</p>
            </div>
          </div>
        </Container>
      </section >
    </>
  )
}

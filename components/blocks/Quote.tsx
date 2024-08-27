import React from 'react'
import { tinaField } from 'tinacms/dist/react'
import { Container } from './Container'
import Image from 'next/image'

export const QuoteBlock = ({ data, index }) => {
  return (
    <>
      <section
        className="relative z-10 py-16 lg:py-24 bg-gradient-to-r from-teal-100/60 to-cyan-100/60 bg-cover bg-center text-black">
        <Container width="wide">
          <div className="flex flex-col items-center lg:justify-center gap-12 lg:gap-36 perspective lg:flex-row">
            <div className="lg:w-1/5 flex flex-col gap-6 lg:gap-8  max-w-sm">
              <Image src={data.logo}
              alt={data.title2}
              height={600}
              width={600}
               />
            </div>
            <div className="min-w-0 lg:w-1/2 ">
              <blockquote className="text-3xl italic mb-2" data-tina-field={tinaField(data, 'title2')}>{data.title2}</blockquote>
              <p data-tina-field={tinaField(data, 'subtext')}>{data.subtext}</p>
            </div>
          </div>
        </Container>
      </section >
    </>
  )
}

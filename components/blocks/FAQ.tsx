import React from 'react'
import { RichTextWrapper } from '../layout/RichTextWrapper'
import { Wrapper } from '../layout/Wrapper'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BlobBackground from '../../public/svg/blob-bg.svg'

export function FaqBlock({ data, index }) {
  return (
    <section key={index} className={`relative overflow-hidden py-16 lg:py-24`}>
      {data.color === 'gradient' && (
        <BlobBackground className="absolute pointer-events-none top-0 left-0 w-full h-auto min-h-screen max-h-full" />
      )}
      <div className="relative z-10">
        <Wrapper narrow>
          <div className="faq-wrapper">
            <div className="mb-10">
              {data.title && (
                <h3 className="font-tuner text-3xl text-orange-500 mb-8">
                  {data.title}
                </h3>
              )}
              {data.intro && (
                <div className="text-xl">
                  <TinaMarkdown content={data.intro} />
                </div>
              )}
            </div>
            <RichTextWrapper>
              {data.questions &&
                data.questions.map((item, index) => {
                  return (
                    <div key={index}>
                      {item.question && <h4>{item.question}</h4>}
                      {item.answer && <TinaMarkdown content={item.answer} />}
                      {index < data.questions.length - 1 && <hr />}
                    </div>
                  )
                })}
            </RichTextWrapper>
          </div>
        </Wrapper>
      </div>
    </section>
  )
}

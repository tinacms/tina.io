import React from 'react'
import { RichTextWrapper } from '../layout/RichTextWrapper'
import { Wrapper } from '../layout/Wrapper'
import type { TinaTemplate } from '@tinacms/cli'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import BlobBackground from '../../public/svg/blob-bg.svg'

export const faqTemplate: TinaTemplate = {
  label: 'FAQ',
  name: 'faq',
  ui: {
    // @ts-ignore TODO: fix this in tinacms
    previewSrc: '/img/blocks/faq.png',
    defaultItem: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'What is Tina?',
          answer:
            'Tina is a Git-backed headless content management system that enables developers and content creators to collaborate seamlessly. With Tina, developers can create a custom visual editing experience that is perfectly tailored to their site.\n',
        },
      ],
      color: 'seafoam',
    },
  },
  fields: [
    { name: 'title', label: 'Title', type: 'string' },
    {
      name: 'intro',
      label: 'Introduction',
      type: 'rich-text',
    },
    {
      name: 'questions',
      label: 'Questions',
      type: 'object',
      list: true,
      fields: [
        { name: 'question', label: 'Question', type: 'string' },
        {
          name: 'answer',
          label: 'Answer',
          type: 'rich-text',
        },
      ],
    },
    {
      name: 'color',
      label: 'Color',
      type: 'string',
      options: [
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
    },
  ],
}

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

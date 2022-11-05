import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Actions } from './Actions'
import { Container } from './Container'
import BlobOne from '../../public/svg/blob-1.svg'
import BlobTwo from '../../public/svg/blob-2.svg'
import BlobThree from '../../public/svg/blob-3.svg'
import BlobFour from '../../public/svg/blob-4.svg'
import BlobFive from '../../public/svg/blob-5.svg'
import BlobSix from '../../public/svg/blob-6.svg'
import type { TinaTemplate } from '@tinacms/cli'

export const showcaseTemplate: TinaTemplate = {
  label: 'Showcase',
  name: 'showcase',
  ui: {
    previewSrc: '/img/blocks/features.png',
  },
  fields: [
    {
      name: 'items',
      label: 'Showcase Items',
      type: 'object',
      list: true,
      templates: [
        {
          label: 'Project',
          name: 'project',
          fields: [
            { name: 'headline', label: 'Headline', type: 'string' },
            {
              name: 'text',
              label: 'Text',
              ui: { component: 'textarea' },
              type: 'string',
            },
            { name: 'url', label: 'URL', type: 'string' },
            {
              name: 'media',
              label: 'Media',
              type: 'object',
              fields: [{ name: 'src', label: 'Image Source', type: 'string' }],
            },
          ],
        },
      ],
    },
  ],
}

export function ShowcaseBlock({ data, index }) {
  const isReversed = index % 2 === 1

  return (
    <>
      <div
        key={'showcase-' + index}
        className={`feature ${isReversed ? 'featureReverse' : ''}`}
      >
        <div className="featureText">
          {data.headline && (
            <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent">
              {data.headline}
            </h3>
          )}
          {(data.text || data.actions) && <hr className="dottedBorder" />}
          {data.text && (
            <div className="textLarge">
              {/* @ts-ignore */}
              <ReactMarkdown source={data.text} />
            </div>
          )}
          {data.actions && <Actions items={data.actions} />}
        </div>
        {data.media && data.media.src && (
          <div className={`featureImage`}>
            <a href={data.url} target="_blank">
              <img
                className="showcaseImage"
                src={data.media.src}
                alt={data.headline}
                width="1120px"
                height="800px"
              />
            </a>
          </div>
        )}
      </div>
      <style jsx>{`
        .feature {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--spacer-size);
          align-items: center;
          z-index: 2;
          :not(:last-child) {
            margin-bottom: 9rem;
          }
          @media (min-width: 900px) {
            grid-template-columns: 1fr 1fr;
            grid-gap: var(--spacer-size);
          }
        }
        .featureReverse {
          direction: rtl;
          > * {
            direction: ltr;
          }
        }
        .featureText {
          position: relative;
          max-width: 28rem;
          min-width: 8rem;
          justify-self: center;
          margin-top: 1rem;
          :global(p > a) {
            text-decoration: underline;
            transition: all ease-out 150ms;
            color: var(--color-tina-blue-dark);
            text-decoration-color: var(--color-seafoam-dark);
            &:hover {
              color: var(--color-tina-blue);
              text-decoration-color: var(--color-tina-blue);
            }
          }
          :global(p) {
            max-width: 400px;
          }
        }
        .featureImage {
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.07);
          margin: 0;
          overflow: hidden;
          border-radius: 0.5rem;
          transition: 0.5s ease;
          backface-visibility: hidden;
          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }
        .featureImage:hover .showcaseImage {
          opacity: 0.3;
          transition: 0.5s ease;
        }
        .dottedBorder {
          display: block;
          border: none;
          border-image: initial;
          background: url('/svg/hr.svg');
          background-size: auto 100%;
          background-repeat: no-repeat;
          height: 7px;
          width: 100%;
          margin: 2rem 0px;
        }
      `}</style>
    </>
  )
}

export function ShowcaseItemsBlock({ data, index }) {
  return (
    <section key={'features-' + index} className={'section featureSection'}>
      <Container>
        {/* TODO: why is there a type error here */}
        {/* @ts-ignore */}
        {data.items &&
          data.items.map((data, index) => {
            return <ShowcaseBlock data={data} index={index} />
          })}
      </Container>
    </section>
  )
}

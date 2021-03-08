import React from 'react'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import { Container } from './Container'

export const hero_template: BlockTemplate = {
  label: 'Hero',
  defaultItem: {
    headline: 'Content editing for modern teams',
    subline: 'Tina is an open-source CMS admin that talks to any API',
    actions: [
      {
        variant: 'button',
        label: 'Try Demo',
        icon: 'arrowRight',
        url: '#',
      },
      {
        variant: 'link',
        label: 'Learn More',
        icon: '',
        url: '#',
      },
    ],
    videoSrc: 'v1571425758/tina-hero-demo-v2',
  },
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'markdown',
    },
    {
      label: 'Subline',
      name: 'subline',
      component: 'text',
    },
    ...ActionFields,
    {
      label: 'Video Cloudinary Source',
      name: 'videoSrc',
      component: 'text',
    },
  ],
}

export function HeroBlock({ data, index }) {
  return (
    <BlocksControls
      index={index}
      insetControls={true}
      focusRing={{ offset: -16 }}
    >
      <section className="hero section blue">
        <Container width="narrow" center>
          <HeroFeature item={data} />
        </Container>
        {data.videoSrc && (
          <div className="splitBackgroundBlackWhite">
            <Container>
              <Video src={data.videoSrc} />
            </Container>
          </div>
        )}
      </section>
      <style jsx>{`
        .hero {
          :global(h2) {
            :global(em) {
              white-space: nowrap;
              color: var(--color-seafoam-dark);
            }
          }
        }

        .splitBackgroundBlackWhite {
          background: linear-gradient(
            to bottom,
            var(--color-blue) 0%,
            var(--color-black) 50%,
            var(--color-light-gray) 50%,
            var(--color-white) 100%
          );
        }
      `}</style>
    </BlocksControls>
  )
}

export const HeroFeature = ({ item }) => {
  return (
    <>
      {item.headline && (
        <h2 className="headingHuge">
          <InlineWysiwyg name="headline">
            <ReactMarkdown
              disallowedTypes={['paragraph', 'heading']}
              unwrapDisallowed
              source={item.headline}
            />
          </InlineWysiwyg>
        </h2>
      )}
      {item.subline && (
        <p className="textHuge">
          <InlineTextarea name="subline" />
        </p>
      )}
      {item.actions && <Actions items={item.actions} align="center" />}
    </>
  )
}

export const Video = ({ src }) => {
  return (
    <>
      <video
        className="video"
        autoPlay={true}
        loop
        muted
        playsInline
        poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${src}.jpg`}
      >
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
            0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);
          display: flex;
          justify-content: center;
          margin-top: calc(var(--spacer-size) * 1.5);
          margin-bottom: -9rem;
        }
      `}</style>
    </>
  )
}

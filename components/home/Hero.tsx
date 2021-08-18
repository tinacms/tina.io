import React from 'react'
import ReactMarkdown from 'react-markdown'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { BlocksControls, InlineTextarea } from 'react-tinacms-inline'
import { BlockTemplate } from 'tinacms'
import { ActionFields, Actions } from './Actions'
import { Container } from './Container'
import HeroBackground from '../../public/svg/hero-background.svg'

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
      <section className="hero">
        <Container width="narrow" center>
          <HeroFeature item={data} />
        </Container>
        {data.videoSrc && (
          <Container>
            <Video src={data.videoSrc} />
          </Container>
        )}
        <div className="background">
          <HeroBackground />
        </div>
      </section>
      <style jsx>{`
        .hero {
          position: relative;
          z-index: 2;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 66.6%;
          z-index: -1;

          :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </BlocksControls>
  )
}

export const HeroFeature = ({ item }) => {
  return (
    <div className="feature">
      {item.headline && <h2 className="heading">{item.headline}</h2>}
      {item.subline && (
        <p className="textHuge">
          <InlineTextarea name="subline" />
        </p>
      )}
      {item.actions && <Actions items={item.actions} align="center" />}
      <style jsx>{`
        .feature {
          padding: 4rem 0 7rem 0;
        }

        .heading {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-size: 3.125rem;
          line-height: 1.4;
          display: inline-block;
          color: transparent;
          background: linear-gradient(
            to right,
            var(--color-orange-light),
            var(--color-orange),
            var(--color-orange-dark)
          );
          -webkit-background-clip: text;
          background-clip: text;

          &:not(:last-child) {
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
    </div>
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

          @media (min-width: 1100px) {
            width: 90%;
            margin: 0 auto;
          }

          @media (min-width: 1400px) {
            width: 80%;
          }
        }
      `}</style>
    </>
  )
}

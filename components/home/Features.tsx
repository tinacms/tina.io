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
import { Blocks } from './Blocks'

const blobSvgOptions = [
  BlobOne,
  BlobTwo,
  BlobThree,
  BlobFour,
  BlobFive,
  BlobSix,
]

export function FeatureBlock({ data, index }) {
  const isReversed = index % 2 === 1
  const FeatureBlobSvg = blobSvgOptions[index % blobSvgOptions.length]

  return (
    <>
      <div
        key={index}
        className={`feature ${isReversed ? 'featureReverse' : ''}`}
      >
        <div className="featureText">
          {data.headline && <h3 className="featureTitle">{data.headline}</h3>}
          <hr className="dottedBorder" />
          <div className="textLarge">
            <ReactMarkdown source={data.subline} />
          </div>
          {data.actions && <Actions items={data.actions} />}
          <div className="blob">
            <FeatureBlobSvg />
          </div>
        </div>
        {data.media.src && (
          <div className={`featureImage`}>
            <img
              src={data.media.src}
              alt={data.headline}
              width="1120px"
              height="800px"
            />
          </div>
        )}
        {data.media.videoSrc && <FeatureVideo src={data.media.videoSrc} />}
        {data.media.cli && (
          <div className={`featureImage`}>
            <FeatureCLI />
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

        .featureTitle {
          font-family: var(--font-tuner);
          font-weight: bold;
          line-height: 1.4;
          margin-bottom: 1rem;
          font-size: 2.25rem;
          color: #00255b;
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
          justify-self: center;
          margin-top: 1rem;

          :global(a) {
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

          :global(img) {
            display: block;
            width: 100%;
            height: auto;
            margin: 0;
          }
        }

        .dottedBorder {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 5px dotted var(--color-seafoam-dark);
          width: 6rem;
          max-width: 100%;
          display: block;
          height: 0px;
          margin: 1.5rem 0px;
        }

        .blob {
          position: absolute;
          top: -3rem;
          left: -10%;
          right: 33.3%;
          bottom: -3rem;
          z-index: -1;
          opacity: 0.5;

          :global(svg) {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
      `}</style>
    </>
  )
}

export function FeaturesBlock({ data, index }) {
  return (
    <section key={index} className={'section white featureSection'}>
      <Container>
        {/* TODO: why is there a type error here */}
        {/* @ts-ignore */}
        <Blocks blocks={data.items} />
      </Container>
    </section>
  )
}

export const FeatureVideo = ({ src }) => {
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
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/e_accelerate:-20/${src}.webm`}
          type="video/webm"
        />
        <source
          src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/e_accelerate:-20/${src}.mp4`}
          type="video/mp4"
        />
      </video>
      <style jsx>{`
        .video {
          width: 100%;
          border-radius: 0.5rem;
          box-shadow: 0 6px 24px rgba(0, 37, 91, 0.05),
            0 2px 4px rgba(0, 37, 91, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.07);
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  )
}

export const FeatureCLI = () => {
  return (
    <>
      <pre className="pre">
        <code>
          <span
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >{`$ npx create-tina-app@latest`}</span>

          <span style={{ display: 'block' }}>
            <span
              style={{
                display: 'inline',
                fontWeight: 'bold',
                color: '#49AF25',
              }}
            >{`?`}</span>

            <span
              style={{
                display: 'inline',
                fontWeight: 'bold',
              }}
            >{` What starter code would you like to use?`}</span>
            {` 
› Bare bones starter
  Tailwind Starter
  Documentation Starter
`}
          </span>

          <span
            style={{
              display: 'block',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              fontWeight: 'bold',
              color: '#49AF25',
            }}
          >{`Setting up Tina...`}</span>
          <span
            style={{ display: 'block', marginBottom: '1.25rem' }}
          >{`Installing Tina packages. This might take a moment... ✅`}</span>
        </code>
      </pre>
      <style jsx>{`
        .pre {
          padding: 3.5rem;
          background: linear-gradient(to top, #f5fdfc, #ecfcfa, #cef9f5);
          white-space: pre-wrap;
          color: #1d2b68;
          font-size: 1rem;
          line-height: 1.5;
          font-family: monospace;

          @media (min-width: 1300px) {
            font-size: 1.365rem;
          }
        }
      `}</style>
    </>
  )
}

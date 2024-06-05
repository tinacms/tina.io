import { Actions } from './Actions';
import { Container } from './Container';
import { Prism } from '../styles/Prism';
import { tinaField } from 'tinacms/dist/react';
import DocsRichText from '../styles/DocsRichText';
import styled from 'styled-components';
import playImage from '../../public/img/playButton.png';

export function FeatureBlock({ data, index }) {
  const isReversed = index % 2 === 1;

const handlePlayClick = () => {
  const url = "https://youtube.com/tinacms"
  window.open(url, '_blank');
}

  return (
    <>
      <div
        key={'feature-' + index}
        className={`relative w-full flex flex-col-reverse items-center lg:justify-center lg:min-h-[70vh] perspective ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
      >
        <div className="w-full lg:w-3/7 max-w-prose flex flex-col gap-6 lg:gap-8">
          {data.headline && (
            <h3
              className="font-tuner inline-block text-3xl sm:pt-8 md:pt-4 lg:pt-0 lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance"
              data-tina-field={tinaField(data, 'headline')}
            >
              {data.headline}
            </h3>
          )}
          <hr className="!my-0" />
          <p
            className="text-lg lg:text-xl lg:leading-normal block bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-2 max-w-prose text-balance"
            data-tina-field={tinaField(data, 'text')}
          >
            {data.text}
          </p>
          <div className="flex lg:flex-row">
            {data.actions && <Actions items={data.actions} />}
          </div>
        </div>
        {data.media && data.media[0] && (
          <div
            className={`relative min-w-0 lg:w-1/2 ${(data.media[0].image || data.media[0].src) && ''}`}
          >
            {data.media && data.media[0].image && (
              <>
                <img
                  src={data.media[0].image}
                  alt={data.headline}
                  className="w-full h-auto rounded-lg shadow-panel overflow-hidden bg-transparent"
                />
              </>
            )}
            {data.media && data.media[0].src && (
              <>
                <button
                  type="button"
                  className="absolute w-20 h-20 sm:left-1/2 sm:top-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 lg:left-[-35px] lg:top-[70px] lg:transform-none z-10"
                  id="play-button-overlay"
                  onClick={handlePlayClick}
                >
                  <img
                    src={playImage.src}
                    alt="Play-button-overlay"
                    className="w-full h-full"
                  />
                </button>
                <FeatureVideo className="w-full h-auto" src={data.media[0].src} />
              </>
            )}
            {data.media && data.media[0].code && (
              <div className="flex flex-col justify-start items-start">
                {data.media[0].file && (
                  <div className="inline-block rounded-t-lg overflow-hidden text-white border-2 border-b-0 border-blue-800 bg-gradient-to-tl from-blue-800 to-blue-900 px-7 py-3 font-tuner">
                    {data.media[0].file}
                  </div>
                )}
                <div
                  className={`file relative ${data.media[0].file
                    ? 'rounded-lg rounded-tl-none'
                    : 'rounded-lg'
                    } overflow-hidden w-full text-blue-50 border-2 border-blue-800 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-1000 shadow-panel`}
                  style={{
                    fontSize:
                      1.25 * (data.media[0].scale ? data.media[0].scale : 1) +
                      'em',
                  }}
                >
                  <CodeWrapper>
                    <div className="[&>pre]:!bg-transparent [&>pre]:!border-none">
                      <Prism
                        lang={
                          data.media[0].language
                            ? data.media[0].language
                            : 'javascript'
                        }
                        theme="nightOwl"
                        value={data.media[0].code}
                      />
                    </div>
                  </CodeWrapper>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        .pane-container {
          perspective: 1000px;
          -moz-perspective: none;
          transform: scale(0.85);
          --right-rotation: -5deg;
        }

        .perspective {
          perspective: 1000px;
          perspective-origin: 50% 50%;
        }

        .pivot {
          transform: rotateY(-5deg);
        }

        .pivot-reverse {
          transform: rotateY(5deg);
        }

        .text-balance {
          text-wrap: balance;
        }

        /* Code Styles */

        :global(.hljs) {
          font-size: unquote('clamp(0.75em,0.676em + 0.37vw, 1em)			');
          padding: 1.5em;
          color: var(--blue-250);
          font-weight: medium;
          font-family: SFMono-Regular, Menlo, Monaco, Consolas,
            'Liberation Mono', 'Courier New', monospace;
          text-shadow: 0 0 7px rgba(var(--blue-250-rgb), 0.15),
            0 0 12px rgba(var(--blue-250-rgb), 0.2),
            0 0 32px rgba(var(--blue-250-rgb), 0.3);
        }

        :global(.hljs-number) {
          color: var(--blue-400);
          text-shadow: 0 0 7px rgba(var(--blue-400-rgb), 0.15),
            0 0 12px rgba(var(--blue-400-rgb), 0.2),
            0 0 32px rgba(var(--blue-400-rgb), 0.3);
        }

        :global(.hljs-meta) {
          color: var(--blue-650);
          text-shadow: 0 0 7px rgba(var(--blue-650-rgb), 0.15),
            0 0 12px rgba(var(--blue-650-rgb), 0.2),
            0 0 32px rgba(var(--blue-650-rgb), 0.3);
        }

        :global(.hljs-attr),
        :global(.hljs-attribute) {
          color: #d07ea5;
          text-shadow: 0 0 7px rgba(208, 126, 165, 0.15),
            0 0 12px rgba(208, 126, 165, 0.2), 0 0 32px rgba(208, 126, 165, 0.5);
        }

        :global(.hljs-string) {
          color: var(--blue-400);
        }
      `}</style>
    </>
  )
}

export function FeaturesBlock({ data, index }) {
  return (
    <section
      key={'features-' + index}
      className={'py-12 lg:py-16 last:pb-20 last:lg:pb-32'}
    >
      <Container width="wide">
        <div className="flex flex-col gap-16 w-full">
          {/* TODO: why is there a type error here */}
          {/* @ts-ignore */}
          {data.features &&
            data.features.map((data, index) => {
              return <FeatureBlock data={data} index={index} />
            })}
        </div>
      </Container>
    </section>
  )
}

export const FeatureVideo = ({ src, className = '' }) => {
  return (
    <video
      className={className}
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
  )
}

const CodeWrapper = styled.div`
  ${DocsRichText}
`

import { CodeButton } from './CodeButton';
import { Container } from './Container';
import { Prism } from '../styles/Prism';
import { tinaField } from 'tinacms/dist/react';
import DocsRichText from '../styles/DocsRichText';
import styled from 'styled-components';
import playImage from '../../public/img/playButton.png';
import { Actions } from './ActionsButton';
import { ModalB } from './ModalButton';
import RenderButton from 'utils/renderButtonArrayHelper';
import Image from 'next/image';
import PlayIcon from './play-button.svg';

export function FeatureBlock({ data, index }) {
  const isReversed = data.isReversed;
  const isBackgroundEnabled = data.imageBackground;
  const isVideo = data.media && data.media[0] && data.media[0].src;

  const isOrNeeded = data.buttons && data.buttons.length >= 2;

  const renderButtonsWithOr = (buttons) => {
    return buttons.reduce((acc, button, index) => {
      if (index > 0 && isOrNeeded) {
        acc.push(
          <span key={`or-${index}`} className="or-text font-tuner">
            or
          </span>
        );
      }
      acc.push(<RenderButton key={index} button={button} index={index} />);
      return acc;
    }, []);
  };

  return (
    <>
      <div
        key={'feature-' + index}
        className={`relative w-full flex flex-col-reverse items-center lg:justify-center lg:min-h-[70vh] perspective ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        <div
          className={`pt-6 lg:pt-0 w-full lg:w-3/10 max-w-60ch flex flex-col gap-6 ${
            isVideo ? 'lg:mr-8' : ''
          }`}
        >
          {data.headline && (
            <h3
              className="font-tuner inline-block text-3xl sm:pt-10 md:pt-4 lg:pt-0 lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center lg:text-left"
              data-tina-field={tinaField(data, 'headline')}
            >
              {data.headline}
            </h3>
          )}
          <div className="hidden sm:hidden lg:block lg:ml-0 lg:pl-0 lg:pb-6">
            <hr className="!my-0 w-full" />
          </div>
          <p
            className="text-lg lg:text-xl lg:leading-normal bg-gradient-to-br from-blue-700 via-blue-900 to-blue-1000 bg-clip-text text-transparent -mb-2 max-w-60ch text-balance text-center lg:text-left"
            data-tina-field={tinaField(data, 'text')}
          >
            {data.text}
          </p>
          <div className="flex flex-col lg:flex-row md:justify-center lg:justify-start items-center gap-10">
            {data.buttons && renderButtonsWithOr(data.buttons)}
          </div>
        </div>
        {data.media && data.media[0] && (
          <div
            className={`relative min-w-0 lg:w-1/2 ${
              isReversed ? 'lg:pr-8' : ''
            } ${(data.media[0].image || data.media[0].src) && ''}`}
          >
            {data.media && data.media[0].image && (
              <>
                <Image
                  src={data.media[0].image}
                  alt={data.headline}
                  className={`w-full h-auto rounded-lg ${
                    isBackgroundEnabled ? 'shadow-panel' : ''
                  } overflow-hidden bg-transparent`}
                  width={1200}
                  height={1200}
                />
              </>
            )}
            {data.media && data.media[0].src && (
              <>
                <div className="relative w-full h-auto pb-4 group">
                  <a
                    href="https://youtube.com/tinacms"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="play-button-overlay"
                    className="relative block"
                  >
                    <FeatureVideo
                      className="w-full h-auto rounded-lg"
                      src={data.media[0].src}
                    />
                    <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon className="h-36 w-36 transition-transform duration-300 group-hover:scale-125" />
                    </div>
                  </a>
                </div>
              </>
            )}

            {data.media && data.media[0].code && (
              <div className="flex flex-col justify-start items-start">
                {data.media[0].file && (
                  <div className="inline-block rounded-t-lg overflow-hidden text-white border-2 border-b-0 border-gray-700 bg-gradient-to-tl from-[#333333] to-[#1a1a1a] px-7 py-3 font-tuner">
                    {data.media[0].file}
                  </div>
                )}
                <div
                  className={`file relative ${
                    data.media[0].file
                      ? 'rounded-lg rounded-tl-none'
                      : 'rounded-lg'
                  } overflow-hidden w-full text-blue-50 border-2 border-gray-700 bg-gradient-to-br from-[#333333] via-[#1a1a1a] to-black ${
                    isBackgroundEnabled ? 'shadow-panel' : ''
                  }`}
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
        .max-w-60ch {
          max-width: 65ch;
        }

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

        :global(.hljs) {
          font-size: unquote('clamp(0.75em,0.676em + 0.37vw, 1em)');
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
  );
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
            data.features.map((featureData, featureIndex) => {
              return (
                <FeatureBlock
                  key={'feature-' + featureIndex}
                  data={featureData}
                  index={featureIndex}
                />
              );
            })}
        </div>
      </Container>
    </section>
  );
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
  );
};

const CodeWrapper = styled.div`
  ${DocsRichText}
`;

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { tinaField } from 'tinacms/dist/react';
import RenderButton from 'utils/renderButtonArrayHelper';
import DocsRichText from '@/component/styles/DocsRichText';
import { Prism } from '@/component/styles/Prism';
import { BLOCK_HEADINGS } from '@/component/styles/typography';
import PlayIcon from '@/public/svg/play-button.svg';

export function FeatureBlock({ data }) {
  const isReversed = data.isReversed;

  return (
    <div
      className={`my-6 flex flex-col-reverse w-full px-10 lg:gap-8 ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      <div
        className={`flex flex-col justify-center lg:justify-start w-full lg:w-1/2 ${
          data.alignCenter ? 'items-center self-center' : ''
        }`}
      >
        {data.headingOne && data.headline && (
          <h1
            className="font-ibm-plex inline-block text-4xl md:text-5xl py-4 lg:text-6xl lg:leading-tight text-balance text-center lg:text-left"
            data-tina-field={tinaField(data, 'headline')}
          >
            {data.headline}
          </h1>
        )}
        {data.headline && !data.headingOne && (
          <h2
            className={`${BLOCK_HEADINGS} font-ibm-plex inline-block  py-4  lg:leading-tight text-balance text-center lg:text-left`}
            data-tina-field={tinaField(data, 'headline')}
          >
            {data.headline}
          </h2>
        )}
        <div className="hidden sm:hidden lg:block lg:ml-0 lg:pl-0 lg:pb-3">
          <hr className="my-0! w-full block border-none bg-[url('/svg/hr.svg')] bg-[length:auto_100%] bg-no-repeat h-[7px]" />
        </div>
        <p
          className="text-lg lg:text-xl lg:leading-normal text-neutral-text-secondary max-w-60ch text-balance text-center lg:text-left py-4"
          data-tina-field={tinaField(data, 'text')}
        >
          {data.text}
        </p>
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-col md:flex-row gap-2">
            {data.buttons?.slice(0, 2).map((button, index) => (
              <RenderButton
                key={`button-${button.id ?? index}`}
                button={button}
                index={index}
              />
            ))}
          </div>
          {data.buttons?.length > 2 && (
            <div className="flex mt-4">
              <RenderButton key="button-2" button={data.buttons[2]} index={2} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        {data.media && <RenderMedia data={data} />}
      </div>
    </div>
  );
}

//Media Names-  "PageBlocksFeaturesFeaturesMediaVideo"
// - "PageBlocksFeaturesFeaturesMediaImage"
// - "PageBlocksFeaturesFeaturesMediaCode"
// - "PageBlocksFeaturesFeaturesMediaThumbnailToInternalVideo"

export const RenderMedia = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  if (
    data.media[0].__typename === 'PageBlocksFeaturesFeaturesMediaVideo' ||
    data.media[0].__typename === 'PageBlocksHeroMediaVideo'
  ) {
    return (
      <div className="relative w-full pb-4 group">
        <a
          href={data.media[0].link ?? 'https://www.youtube.com/@TinaCMS'}
          target="_blank"
          rel="noopener noreferrer"
          id="play-button-overlay"
          className="relative block"
        >
          <FeatureVideo
            className="w-full h-auto rounded-lg"
            src={data.media[0].src}
          />
          <div className="absolute inset-0 bg-gray-800 opacity-5 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayIcon className="h-36 w-36 transition-transform duration-300 group-hover:scale-125" />
          </div>
        </a>
      </div>
    );
  }
  if (
    data.media[0].__typename === 'PageBlocksFeaturesFeaturesMediaImage' ||
    data.media[0].__typename === 'PageBlocksHeroMediaImage'
  ) {
    return (
      <Image
        src={data.media[0].image}
        alt={data.headline}
        className={`w-full h-auto rounded-lg ${
          data.isBackgroundEnabled ? 'shadow-panel' : ''
        } overflow-hidden bg-transparent`}
        width={1200}
        height={1200}
      />
    );
  }
  if (
    data.media[0].__typename === 'PageBlocksFeaturesFeaturesMediaCode' ||
    data.media[0].__typename === 'PageBlocksHeroMediaCode'
  ) {
    return (
      <div className="flex flex-col justify-start items-start">
        {data.media[0].file && (
          <div className="inline-block rounded-t-lg overflow-hidden text-white border-2 border-b-0 border-gray-700 bg-linear-to-tl from-[#333333] to-[#1a1a1a] px-7 py-3 font-ibm-plex">
            {data.media[0].file}
          </div>
        )}
        <div
          className={`file relative ${
            data.media[0].file ? 'rounded-lg rounded-tl-none' : 'rounded-lg'
          } overflow-hidden w-full text-blue-50 border-2 border-gray-700 bg-linear-to-br from-[#333333] via-[#1a1a1a] to-black ${
            data.isBackgroundEnabled ? 'shadow-panel' : ''
          }`}
          style={{
            fontSize: `${1.25 * (data.media[0].scale ? data.media[0].scale : 1)}em`,
          }}
        >
          <CodeWrapper>
            <div className="[&>pre]:bg-transparent! [&>pre]:border-none! rounded-xl">
              <Prism
                lang={
                  data.media[0].language ? data.media[0].language : 'javascript'
                }
                theme="nightOwl"
                value={data.media[0].code}
              />
            </div>
          </CodeWrapper>
        </div>
      </div>
    );
  }
  if (
    data.media[0].__typename ===
      'PageBlocksFeaturesFeaturesMediaThumbnailToInternalVideo' ||
    data.media[0].__typename === 'PageBlocksHeroMediaThumbnailToInternalVideo'
  ) {
    return (
      <div className="relative w-full pb-4 group">
        {isPlaying ? (
          <div className="flex flex-col justify-center w-full h-full pb-4 group">
            <YouTubeEmbed videoId={data.media[0].videoEmbedId} />
            <span className="text-sm text-gray-400 mt-2 text-left">
              {data.media[0].figureCaption}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="relative block w-full"
              id="play-button-overlay"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={data.media[0].thumbnailImage}
                  alt={data.headline}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-gray-800 opacity-5 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="h-36 w-36 transition-transform duration-300 group-hover:scale-125" />
                </div>
              </div>
            </button>
            <span className="text-sm text-gray-400 mt-2 text-left">
              {data.media[0].figureCaption}
            </span>
          </div>
        )}
      </div>
    );
  }
  if (
    data.media[0].__typename ===
      'PageBlocksFeaturesFeaturesMediaVideoThumbnailToInternalVideo' ||
    data.media[0].__typename ===
      'PageBlocksHeroMediaVideoThumbnailToInternalVideo'
  ) {
    return (
      <div className="relative w-full pb-4 group">
        {isPlaying ? (
          <div className="flex flex-col justify-center w-full h-full pb-4 group">
            <YouTubeEmbed videoId={data.media[0].videoEmbedId} />
            <span className="text-sm text-gray-400 mt-2 text-left">
              {data.media[0].figureCaption}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="relative block w-full"
              id="play-button-overlay"
            >
              <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay={true}
                  loop
                  muted
                  playsInline
                  poster={data.media[0].thumbnailVideo}
                >
                  <source
                    src={data.media[0].thumbnailVideo}
                    type="video/webm"
                  />
                  <source src={data.media[0].thumbnailVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gray-800 opacity-5 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="h-36 w-36 transition-transform duration-300 group-hover:scale-125" />
                </div>
              </div>
            </button>
            <span className="text-sm text-gray-400 mt-2 text-left">
              {data.media[0].figureCaption}
            </span>
          </div>
        )}
      </div>
    );
  }
  if (
    data.media[0].__typename === 'PageBlocksFeaturesFeaturesMediaV2Video' ||
    data.media[0].__typename === 'PageBlocksHeroMediaV2Video'
  ) {
    return (
      <div className="relative w-full pb-4">
        {/** biome-ignore lint/performance/noImgElement: <TODO> */}
        <img
          src={data.media[0].src}
          alt={data.headline}
          className="w-full h-auto rounded-lg"
        />
      </div>
    );
  }
};

export function FeaturesBlock({ data, index }) {
  return (
    <section key={`features-${index}`} className="w-full">
      <div className="flex flex-col gap-32 lg:gap-48 max-w-7xl mx-auto w-full">
        {/* TODO: why is there a type error here */}
        {/* @ts-ignore */}
        {data.features?.map((featureData, featureIndex) => {
          return (
            <FeatureBlock
              key={`feature-${featureData.id ?? featureIndex}`}
              data={featureData}
            />
          );
        })}
      </div>
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
      poster={`${src}`}
    >
      <source src={`${src}`} type="video/webm" />
      <source src={`${src}`} type="video/mp4" />
    </video>
  );
};

const CodeWrapper = styled.div`
  ${DocsRichText}
`;

const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
);

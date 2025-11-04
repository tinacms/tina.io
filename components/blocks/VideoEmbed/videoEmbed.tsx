// biome-ignore lint/correctness/noUnusedImports: <TODO>
import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { cn } from '@/lib/utils';
import { LiteYouTube } from './LiteYouTube';
import { extractYouTubeId } from './utils';

type YouTubeEmbedProps = {
  src: string;
  className?: string;
};

export const YouTubeEmbed = ({ src, className }: YouTubeEmbedProps) => {
  const videoId = extractYouTubeId(src);

  if (!videoId) {
    console.error('Invalid YouTube URL:', src);
    return (
      <div
        className={cn(
          'relative w-full bg-gray-200 flex items-center justify-center h-[400px]',
          className,
        )}
      >
        <p className="text-gray-500">Video URL is invalid or missing</p>
      </div>
    );
  }

  return (
    <LiteYouTube
      id={videoId}
      title="YouTube video player"
      className={className}
    />
  );
};

interface VideoDisplayProps {
  data: {
    __typename?: string;
    altText?: string | null;
    title?: string | null;
    externalVideoLink?: string | null;
    figureCaption?: string | null;
  };
}

export default function VideoDisplay({ data }: VideoDisplayProps) {
  const { externalVideoLink, title, figureCaption } = data;

  return (
    <Container className="flex flex-col justify-center mx-auto container py-8">
      <div
        className="items-center w-full h-auto text-center"
        id="home-page-video"
      >
        {title && (
          <>
            <h2
              className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex inline-block pb-8 lg:leading-tight text-black text-balance text-center lg:text-left`}
              data-tina-field={tinaField(data, 'title')}
            >
              {title}
            </h2>
            <div className="hidden sm:hidden lg:block lg:ml-0 lg:pl-0 lg:pb-8">
              <hr className="my-0! m-auto w-32 block border-none bg-[url('/svg/hr.svg')] bg-[length:auto_100%] bg-no-repeat h-[7px]" />
            </div>
          </>
        )}

        <div className="w-full rounded-xl overflow-hidden">
          <YouTubeEmbed src={externalVideoLink || ''} />
        </div>

        {figureCaption && (
          <p className="text-sm text-gray-400 mt-2 text-left">
            {figureCaption}
          </p>
        )}
      </div>
    </Container>
  );
}

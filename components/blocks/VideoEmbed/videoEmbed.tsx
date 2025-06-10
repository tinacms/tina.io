import Container from '@/component/util/Container';
import { cn } from '@/lib/utils';
import React from 'react';
import { tinaField } from 'tinacms/dist/react';

type YouTubeEmbedProps = {
  src: string;
  className?: string;
};

export const YouTubeEmbed = ({ src, className }: YouTubeEmbedProps) => {
  const isValidYoutubeUrl =
    src && (src.includes('youtube.com/embed/') || src.includes('youtu.be/'));

  if (!isValidYoutubeUrl) {
    console.error('Invalid YouTube URL:', src);
    return (
      <div
        className={cn(
          'relative w-full bg-gray-200 flex items-center justify-center h-[400px]',
          className
        )}
      >
        <p className="text-gray-500">Video URL is invalid or missing</p>
      </div>
    );
  }

  return (
    <div className={cn('relative pt-[56.25%] w-full', className)}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
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
          <h3
            className="font-ibm-plex inline-block text-3xl md:text-4xl py-4 lg:text-5xl lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center lg:text-left mb-6"
            data-tina-field={tinaField(data, 'title')}
          >
            {title}
          </h3>
        )}

        <div className="w-full">
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

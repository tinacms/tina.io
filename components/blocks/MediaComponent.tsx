import React, { useState } from 'react';
import Image from 'next/image';

const MediaComponent = ({ data }) => {
  const { headline, mediaItem } = data;

  const renderMedia = (media) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayVideo = () => {
      setIsPlaying(true);
    };

    if (
      media.__typename ===
      'PageBlocksMediaComponentMediaItemCloudinaryMediaComponent'
    ) {
      if (media.media && media.media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/)) {
        return (
          <div
            className="relative rounded-lg shadow-2xl"
            style={{ width: '600px', height: '340px', overflow: 'hidden' }}
          >
            <Image
              src={media.media}
              alt="Media"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        );
      } else if (media.media && media.media.match(/\.(mp4|webm|ogg)$/)) {
        return (
          <div
            className="relative rounded-lg shadow-2xl"
            style={{ width: '600px', height: '340px', overflow: 'hidden' }}
            onClick={handlePlayVideo}
          >
            {isPlaying ? (
              <video
                src={media.media}
                controls
                autoPlay
                className="object-cover rounded-lg"
                style={{ width: '600px', height: '340px' }}
              />
            ) : (
              <div className="relative rounded-lg shadow-2xl" style={{ width: '600px', height: '340px' }}>
                {media.thumbnail && (
                  <Image
                    src={media.thumbnail}
                    alt="Video Thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="text-orange-500 text-3xl">
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }
    } else if (
      media.__typename === 'PageBlocksMediaComponentMediaItemYoutubeMedia'
    ) {
      return (
        <div
          className="overflow-hidden rounded-lg shadow-2xl"
          style={{ width: '600px', height: '340px' }}
        >
          <iframe
            width="600"
            height="340"
            src={media.embedUrl}
            title="YouTube video player"
            className="object-cover rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="media-component md:px-8 xl:px-8 lg:px-8 px-3 md:w-4/5 lg:w-5/6 w-full mx-auto pb-4 pt-8">
      <h2 className="text-center font-tuner text-3xl sm:pt-10 md:pt-4 lg:pt-0 lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent pb-10">
        {headline}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mediaItem &&
          mediaItem.map((item, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center p-2"
            >
              {renderMedia(item)}
            </div>
          ))}
      </div>
    </div>
  );
};

export { MediaComponent };

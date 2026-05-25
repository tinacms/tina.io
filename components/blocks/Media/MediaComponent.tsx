import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';

const VideoGridComponent = ({ data }) => {
  const { mediaItem, typenames } = data || {};

  const sizeClasses =
    'w-[500px] h-[300px] sm:w-[500px] sm:h-[300px] md:w-[500px] md:h-[320px] lg:w-[600px] lg:h-[340px] xl:w-[600px] xl:h-[340px]';

  const renderMedia = (media) => {
    if (media.__typename === typenames.youtube) {
      return (
        <div className={`overflow-hidden rounded-lg shadow-2xl ${sizeClasses}`}>
          <iframe
            width="100%"
            height="100%"
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

  const renderMediaList = (mediaList) => {
    return (
      <>
        {Array.isArray(mediaList) &&
          mediaItem.map((item) => (
            <div
              key={item.id}
              className="relative flex justify-center items-center"
            >
              {renderMedia(item)}
            </div>
          ))}
      </>
    );
  };

  return renderMediaList(mediaItem);
};

const MediaComponent = ({ data }) => {
  const { headline, mediaItem } = data || {};

  const typenames = {
    youtube: 'PageBlocksMediaComponentMediaItemYoutubeMedia',
  };

  return (
    <div className="media-component md:px-8 xl:px-8 lg:px-8 px-3 max-w-(--breakpoint-xl) mx-auto pb-4 pt-8">
      <h2
        className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex text-center sm:pt-10 md:pt-4 lg:pt-0 lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent pb-10`}
      >
        {headline}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {VideoGridComponent({ data: { mediaItem, typenames } })}
      </div>
    </div>
  );
};

export { MediaComponent, VideoGridComponent };

import React, { useState } from 'react'
import Image from 'next/image'
import { FaYoutube } from 'react-icons/fa'

const MediaComponent = ({ data }) => {
  const { headline, mediaItem } = data

  const [isPlayingArray, setIsPlayingArray] = useState(
    mediaItem.map(() => false)
  )

  const handlePlayVideo = (index) => {
    const newIsPlayingArray = [...isPlayingArray]
    newIsPlayingArray[index] = true
    setIsPlayingArray(newIsPlayingArray)
  }

  const renderMedia = (media, index) => {
    const isPlaying = isPlayingArray[index]

    const sizeClasses =
      'w-[500px] h-[300px] sm:w-[500px] sm:h-[300px] md:w-[500px] md:h-[320px] lg:w-[600px] lg:h-[340px] xl:w-[600px] xl:h-[340px]'

    if (
      media.__typename ===
      'PageBlocksMediaComponentMediaItemCloudinaryMediaComponent'
    ) {
      if (media.media && media.media.match(/\.(jpeg|jpg|gif|png|svg|webp)$/)) {
        return (
          <div
            className={`relative rounded-lg shadow-2xl ${sizeClasses} overflow-hidden`}
          >
            <Image
              src={media.media}
              alt="Media"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )
      } else if (media.media && media.media.match(/\.(mp4|webm|ogg)$/)) {
        return (
          <div
            className={`relative rounded-lg shadow-2xl ${sizeClasses} overflow-hidden`}
            onClick={() => handlePlayVideo(index)}
          >
            {isPlaying ? (
              <video
                src={media.media}
                controls
                autoPlay
                className="object-cover rounded-lg"
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div className={`relative rounded-lg shadow-2xl ${sizeClasses}`}>
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
                  <button className="relative text-7xl text-orange-500">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white w-5 h-5"></div>
                      </div>
                      <FaYoutube className="relative" />
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      }
    } else if (
      media.__typename === 'PageBlocksMediaComponentMediaItemYoutubeMedia'
    ) {
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
      )
    }
    return null
  }

  return (
    <div className="media-component md:px-8 xl:px-8 lg:px-8 px-3 max-w-screen-xl mx-auto pb-4 pt-8">
      <h2 className="text-center font-tuner text-3xl sm:pt-10 md:pt-4 lg:pt-0 lg:text-5xl lg:leading-tight bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent pb-10">
        {headline}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {mediaItem &&
          mediaItem.map((item, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center"
            >
              {renderMedia(item, index)}
            </div>
          ))}
      </div>
    </div>
  )
}

export { MediaComponent }

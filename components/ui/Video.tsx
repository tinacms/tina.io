import React from 'react'
import styled from 'styled-components'

interface VideoProps {
  src: string
  autoPlay?: boolean
}

export const Video = styled(({ src, autoPlay, ...styleProps }: VideoProps) => {
  return (
    <div {...styleProps}>
      <video
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        poster={`${src}`}
      >
        <source
          src={`${src}`}
          type="video/webm"
        />
        <source
          src={`${src}`}
          type="video/mp4"
        />
      </video>
    </div>
  )
})`
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
  img,
  video {
    margin: 0 auto;
    box-shadow: 0 14px 28px rgba(104, 120, 125, 0.25);
    border-radius: 10px;
    max-width: 934px;
    width: 100%;
  }
`

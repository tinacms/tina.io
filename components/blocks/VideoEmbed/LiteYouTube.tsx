'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LiteYouTubeProps {
  id: string;
  title?: string;
  className?: string;
}

export const LiteYouTube = ({
  id,
  title = 'YouTube video',
  className,
}: LiteYouTubeProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative w-full', className)}
      style={{ paddingTop: '56.25%' }}
    >
      {!loaded && (
        <button
          type="button"
          aria-label={`Play ${title}`}
          onClick={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full border-0 cursor-pointer bg-cover bg-center bg-no-repeat rounded-lg shadow-lg"
          style={{
            backgroundImage: `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)`,
          }}
        >
          <svg
            width="68"
            height="48"
            viewBox="0 0 68 48"
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <title>Play YouTube video</title>
            <path
              d="M66.52 7.36C65.6 4.96 63.84 3.2 61.44 2.28C57.68 1 34 1 34 1S10.32 1 6.56 2.28C4.16 3.2 2.4 4.96 1.48 7.36 0 12.12 0 24 0 24s0 11.88 1.48 16.64c.92 2.4 2.68 4.16 5.08 5.08C10.32 47 34 47 34 47s23.68 0 27.44-1.28c2.4-.92 4.16-2.68 5.08-5.08C68 35.88 68 24 68 24s0-11.88-1.48-16.64z"
              fill="#f00"
            />
            <path d="M45 24 27 14v20" fill="#fff" />
          </svg>
        </button>
      )}
      {loaded && (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

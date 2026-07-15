'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LiteYouTube } from './LiteYouTube';
import { extractYouTubeId } from './utils';

type YouTubeModalProps = {
  src: string;
  title?: string;
  className?: string;
};

/** Thumbnail that opens the video in an in-page modal player (closes back to the same scroll position). */
export const YouTubeModal = ({
  src,
  title = 'YouTube video',
  className,
}: YouTubeModalProps) => {
  const [open, setOpen] = useState(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <LiteYouTube
        id={videoId}
        title={title}
        className={className}
        onActivate={() => setOpen(true)}
      />
      <DialogContent className="!max-w-4xl border-0 bg-black p-2 sm:p-3">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {open && (
          <div className="relative w-full aspect-h-9 aspect-w-16">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              className="absolute inset-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

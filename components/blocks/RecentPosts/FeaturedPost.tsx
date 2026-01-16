import { tinaField } from 'tinacms/dist/react';
import Link from 'next/link';
import { YouTubeEmbed } from '../VideoEmbed/videoEmbed';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date
    .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase();
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}

type FeaturedPostProps = {
  featuredPost: {
    title?: string;
    url?: string;
    datePosted?: string;
    authorName?: string;
    authorUrl?: string;
    embedUrl?: string;
    imageUrl?: string;
  };
};

export const FeaturedPost = ({ featuredPost }: FeaturedPostProps) => {
  return (
    <div className="flex flex-col gap-2 w-full max-md:max-w-md">
      {featuredPost.datePosted && (
        <p 
          className='text-base text-neutral-text-secondary w-fit'
          data-tina-field={tinaField(featuredPost, 'datePosted')}
        >
          {formatDate(featuredPost.datePosted)}
        </p>
      )}
      <div className="gap-2 flex flex-col md:flex-row w-full">
        <div className='w-full md:w-[calc(75%-1rem)]'>
          {featuredPost.imageUrl ? (
            <img 
              src={featuredPost.imageUrl} 
              alt={featuredPost.title || 'Featured post'} 
              className="w-full h-auto object-cover"
              data-tina-field={tinaField(featuredPost, 'imageUrl')}
            />
          ) : featuredPost.embedUrl ? (
            <YouTubeEmbed src={featuredPost.embedUrl} />
          ) : null}
        </div>
        <div className='flex flex-col py-1 gap-2'>
          {featuredPost.url ? (
            <Link href={featuredPost.url} className='hover:underline'>
              <h3 
                className='text-2xl' 
                data-tina-field={tinaField(featuredPost, 'title')}
              >
                {featuredPost.title}
              </h3>
            </Link>
          ) : (
            <h3 
              className='text-2xl' 
              data-tina-field={tinaField(featuredPost, 'title')}
            >
              {featuredPost.title}
            </h3>
          )}
          
          {featuredPost.authorName && (
            <p className='text-neutral-text-secondary text-base'>
              By{' '}
              <a 
                className='hover:text-neutral-text uppercase underline transition-colors' 
                href={featuredPost.authorUrl || '#'}
                data-tina-field={tinaField(featuredPost, 'authorName')}
              >
                {featuredPost.authorName}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

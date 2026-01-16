import { tinaField } from 'tinacms/dist/react';
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
    datePosted?: string;
    authorName?: string;
    authorUrl?: string;
    embedUrl?: string;
    imageUrl?: string;
  };
};

export const FeaturedPost = ({ featuredPost }: FeaturedPostProps) => {
  return (
    <div className="gap-2 flex w-full">
      <div className='w-[calc(50%-1rem)]'>
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
      <div className='flex flex-col gap-2'>
        {featuredPost.datePosted && (
          <p 
            className='text-sm text-neutral-text-secondary'
            data-tina-field={tinaField(featuredPost, 'datePosted')}
          >
            {formatDate(featuredPost.datePosted)}
          </p>
        )}
        <h3 
          className='text-2xl' 
          data-tina-field={tinaField(featuredPost, 'title')}
        >
          {featuredPost.title}
        </h3>
        
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
  );
};

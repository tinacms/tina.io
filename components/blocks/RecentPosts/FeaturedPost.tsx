import { tinaField } from 'tinacms/dist/react';
import Link from 'next/link';
import { YouTubeEmbed } from '../VideoEmbed/videoEmbed';
import { formatDate } from '@/utils/formatDate';
import { LiteYouTube } from '../VideoEmbed/LiteYouTube';
import { extractYouTubeId } from '../VideoEmbed/utils';

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
    <div className="flex overflow-hidden flex-col gap-2 w-full z-1 rounded-lg max-md:max-w-md relative">
      <div className="absolute inset-x-0 inset-y-0 bottom-0 right-0 bg-gradient-to-t from-orange-300 via-orange-200 to-sky-300 opacity-15 pointer-events-none -z-10" />
      <div className="gap-2 flex flex-col md:flex-row w-full">
        <div className='w-full md:w-[calc(50%-1rem)]'>
          {featuredPost.imageUrl ? (
            <img 
              src={featuredPost.imageUrl} 
              alt={featuredPost.title || 'Featured post'} 
              className="w-full h-auto object-cover"
              data-tina-field={tinaField(featuredPost, 'imageUrl')}
            />
          ) : featuredPost.embedUrl ? (
            
            <YouTubeEmbed className='rounded-none h-full ' src={featuredPost.embedUrl} />
          ) : null}
        </div>
        <div className='flex w-1/2 flex-col py-3 gap-2'>
          <span className="uppercase border border-orange-500 bg-white px-3 py-0.5 rounded-full text-sm text-orange-500 font-li w-fit">
            Featured
          </span>
          {featuredPost.datePosted && (
            <p 
              className='text-sm text-neutral-text-secondary w-fit'
              data-tina-field={tinaField(featuredPost, 'datePosted')}
            >
              {formatDate(featuredPost.datePosted)}
            </p>
          )}
          {featuredPost.url ? (
            <Link href={featuredPost.url} className='hover:underline'>
              <h3 
                className='text-lg' 
                data-tina-field={tinaField(featuredPost, 'title')}
              >
                {featuredPost.title}
              </h3>
            </Link>
          ) : (
            <h3 
              className='text-lg' 
              data-tina-field={tinaField(featuredPost, 'title')}
            >
              {featuredPost.title}
            </h3>
          )}
          
          
          
          {featuredPost.authorName && (
            <p className='text-neutral-text-secondary text-sm'>
              By{' '}
              {featuredPost.authorUrl ? (
                <Link 
                  className='hover:text-neutral-text uppercase underline transition-colors' 
                  href={featuredPost.authorUrl}
                  data-tina-field={tinaField(featuredPost, 'authorName')}
                >
                  {featuredPost.authorName}
                </Link>
              ) : (
                <span 
                  className='uppercase'
                  data-tina-field={tinaField(featuredPost, 'authorName')}
                >
                  {featuredPost.authorName}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

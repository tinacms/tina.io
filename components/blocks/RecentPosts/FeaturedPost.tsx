import { tinaField } from 'tinacms/dist/react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from './RecentPosts';
import { cn } from '@/lib/utils';

type FeaturedPostProps = {
  featuredPost: {
    title?: string;
    description?: string;
    url?: string;
    datePosted?: string;
    authorName?: string;
    authorUrl?: string;
    imageUrl?: string;
  };
};

export const FeaturedPost = ({ featuredPost }: FeaturedPostProps) => {

  return (

    <div className="flex overflow-hidden flex-col gap-2 shadow-md p-3 bg-gradient-to-br from-white/10 to-white/40 hover:to-white/40 w-full z-0 rounded-lg max-md:max-w-md relative">
    <Link href={featuredPost.url} className='absolute inset-0 z-1' target="_blank" rel="noopener noreferrer"/>

      {/* <div className="absolute inset-x-0 inset-y-0 bottom-0 right-0 bg-gradient-to-t from-orange-300 via-orange-200 to-sky-300 opacity-15 pointer-events-none -z-10" /> */}
      <div className="md:gap-5 flex flex-col md:flex-row w-full">
        {featuredPost.imageUrl && (
        <div className='w-full md:w-1/2 flex relative'>
          
            <div
              data-tina-field={tinaField(featuredPost, 'imageUrl')}
              className="aspect-w-16 aspect-h-9 my-auto w-full rounded-lg overflow-hidden relative">
              <Image 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title || 'Featured post'} 
                fill
                className="object-cover"
              />
            </div>
          
        </div>
        )}
        <div className={cn('flex flex-col py-3 gap-2', featuredPost.imageUrl && 'md:w-1/2')}>
          <div className='flex items-center gap-2'>
            {featuredPost.datePosted && (
              <p 
                className='text-sm text-neutral-text-secondary w-fit'
                data-tina-field={tinaField(featuredPost, 'datePosted')}
              >
                {formatDate(featuredPost.datePosted)}
              </p>
            )}
            <span className="uppercase bg-orange-500 text-white px-3 py-0.5 rounded-full text-sm font-li w-fit">
              Featured
            </span>
          </div>
          {featuredPost.url ? (
              <h3 
                className='text-lg' 
                data-tina-field={tinaField(featuredPost, 'title')}
              >
                {featuredPost.title}
              </h3>
          ) : (
            <h3 
              className='text-lg' 
              data-tina-field={tinaField(featuredPost, 'title')}
            >
              {featuredPost.title}
            </h3>
          )}
          
          {featuredPost.description && (
            <p 
              className='text-xs text-neutral-text-secondary'
              data-tina-field={tinaField(featuredPost, 'description')}
            >
              {featuredPost.description}
            </p>
          )}
          
          {featuredPost.authorName && (
            <p className='text-neutral-text-secondary text-sm'>
              By{' '}
              {featuredPost.authorUrl ? (
                <Link 
                  className='relative hover:text-neutral-text z-2 uppercase underline transition-colors' 
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

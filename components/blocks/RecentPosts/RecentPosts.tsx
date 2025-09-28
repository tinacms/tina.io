import { RichTextWrapper } from 'components/layout/RichTextWrapper';
import { DynamicLink } from 'components/ui';
import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';
import {
  BLOCK_HEADINGS_SIZE,
  SECTION_HEADINGS_SIZE,
} from '@/component/styles/typography';
import Container from '@/component/util/Container';
import { YouTubeEmbed } from '../VideoEmbed/videoEmbed';
import { extractYouTubeId } from '../VideoEmbed/utils';

const getPostHref = (path) => {
  let processedPath = path.replace(/^content/, '').replace(/\.mdx$/, '');
  processedPath = processedPath.replace('/blog-zh', '/zh/blog');
  return processedPath;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date
    .toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase();
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}

type VideoCardProps = {
  authorName: string;
  authorUrl: string;
  dateReleased: string;
  embedUrl: string;
  title: string;
};

const VideoCard = ({
  authorName,
  authorUrl,
  dateReleased,
  embedUrl,
  title,
}: VideoCardProps) => {
  const videoId = extractYouTubeId(embedUrl);
  return (
    <div className="flex-1 max-w-md flex flex-col gap-1 md:gap-2">
      <YouTubeEmbed src={embedUrl} />
      <span className="text-neutral-text-secondary text-sm">
        {formatDate(dateReleased)}
      </span>
      <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
        <h3 className="text-base md:text-xl inline-block hover:underline transition-all duration-300">{title}</h3>
      </Link>
      <span className="text-neutral-text-secondary text-sm">
        By{' '}
        <Link
          className="underline hover:text-neutral-text transition-colors duration-300"
          href={authorUrl}
        >
          {authorName.toUpperCase()}
        </Link>
      </span>
    </div>
  );
};

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  return (
    <Container size="medium" className="grid grid-cols-5 gap-16 py-16">
      <section className="col-span-5 lg:col-span-3 flex flex-col gap-8 items-center md:items-start">
        <h2
          className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex pb-8 lg:leading-tight text-black text-balance`}
          data-tina-field={tinaField(data, 'title')}
        >
          {data?.title || 'Recent Posts'}
        </h2>
        <div className="flex flex-col justify-center md:flex-row gap-8 md:gap-4 max-w-4xl">
          {data.youtubeVideos.map((video: VideoCardProps) => (
            <VideoCard
              key={video.embedUrl}
              authorName={video.authorName}
              authorUrl={video.authorUrl}
              dateReleased={video.dateReleased}
              embedUrl={video.embedUrl}
              title={video.title}
            />
          ))}
        </div>
      </section>
      <section
        key={`recent-posts-${index}`}
        className={'relative z-10 col-span-5 lg:col-span-2'}
      >
        <h3
          className={`block text-center md:text-left lg:hidden ${SECTION_HEADINGS_SIZE} font-ibm-plex pb-8 lg:leading-tight text-black text-balance`}
        >
          Blog Posts
        </h3>
        <div className=" flex flex-col md:flex-wrap lg:flex-col gap-10 lg:gap-16 max-w-md mx-auto md:max-w-none">
          {recentPosts.edges.map(({ node: post }) => {
            const slug = post._sys.filename;
            const href = getPostHref(post._sys.path);
            return (
              <div
                key={slug}
                className="group flex-1 flex flex-col gap-2  min-w-[20rem]"
              >
                <span className="text-neutral-text-secondary text-sm">
                  {formatDate(post.date)}
                </span>
                <DynamicLink href={href} passHref>
                  <h3 className="text-base md:text-xl inline-block hover:underline transition-all duration-300">
                    {post.title}
                  </h3>
                </DynamicLink>
                <RichTextWrapper>
                  <div className="flex flex-row mb-3 text-center justify-between">
                    <div className="flex">
                      <span className="text-neutral-text-secondary">
                        By {post.author.toUpperCase()}
                      </span>{' '}
                    </div>
                  </div>
                </RichTextWrapper>
              </div>
            );
          })}
        </div>
      </section>
    </Container>
  );
};

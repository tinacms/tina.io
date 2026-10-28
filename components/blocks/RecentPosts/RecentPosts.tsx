'use client';

import { RichTextWrapper } from 'components/layout/RichTextWrapper';
import { DynamicLink } from 'components/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { tinaField } from 'tinacms/dist/react';
import {
  BODY_MUTED,
  CARD_TITLE,
  EYEBROW_LINK,
  LINK,
  SECTION_TITLE,
  SUB_HEADING,
  TITLE_LINK,
} from '@/component/styles/typography';
import { SkeletonBar } from '@/component/ui/SkeletonBar';
import Container from '@/component/util/Container';
import { formatDate } from '@/utils/formatDate';
import { extractYouTubeId } from '../VideoEmbed/utils';
import { YouTubeEmbed } from '../VideoEmbed/videoEmbed';
import { FeaturedPost } from './FeaturedPost';

const RECENT_VIDEO_COUNT = 2;
const VIDEO_SKELETON_KEYS = [
  'recent-video-skeleton-1',
  'recent-video-skeleton-2',
];

const getPostHref = (path) => {
  let processedPath = path.replace(/^content/, '').replace(/\.mdx$/, '');
  processedPath = processedPath.replace('/blog-zh', '/zh/blog');
  return processedPath;
};

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
    <div className="flex-1 max-w-md flex flex-col gap-1 md:gap-2 animate-row-in">
      <YouTubeEmbed src={embedUrl} />
      <span className={BODY_MUTED}>{formatDate(dateReleased)}</span>
      <Link
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3 className={`${SUB_HEADING} ${TITLE_LINK} inline-block`}>{title}</h3>
      </Link>
      <span className={BODY_MUTED}>
        By{' '}
        <Link className={`${BODY_MUTED} ${LINK}`} href={authorUrl}>
          {authorName}
        </Link>
      </span>
    </div>
  );
};

const VideoCardSkeleton = () => (
  <div className="flex-1 max-w-md flex flex-col gap-1 md:gap-2">
    <div className="relative w-full aspect-h-9 aspect-w-16">
      <span className="absolute inset-0 rounded-lg animate-shimmer bg-skeleton-shimmer bg-skeleton" />
    </div>
    <SkeletonBar width="w-24" />
    <SkeletonBar width="w-full" />
    <SkeletonBar width="w-32" />
  </div>
);

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  const featuredPost = data?.featuredPost;
  const curatedVideos: VideoCardProps[] = data?.youtubeVideos ?? [];

  const [fetchedVideos, setFetchedVideos] = useState<VideoCardProps[] | null>(
    null,
  );
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/recent-videos')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((videos) => {
        if (active) {
          setFetchedVideos(Array.isArray(videos) ? videos : []);
        }
      })
      .catch(() => {
        if (active) {
          setFetchFailed(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const isLoading = fetchedVideos === null && !fetchFailed;

  const featuredId = extractYouTubeId(featuredPost?.url);
  const liveVideos = (fetchedVideos ?? [])
    .filter((video) => extractYouTubeId(video.embedUrl) !== featuredId)
    .slice(0, RECENT_VIDEO_COUNT);

  const videos = liveVideos.length > 0 ? liveVideos : curatedVideos;

  return (
    <Container size="medium" className="grid grid-cols-3 gap-16 py-16">
      <section className="col-span-3 lg:col-span-2 flex flex-col gap-8 items-center md:items-start">
        {featuredPost && <FeaturedPost featuredPost={featuredPost} />}
        <h2
          className={`${SECTION_TITLE} col-span-3`}
          data-tina-field={tinaField(data, 'title')}
        >
          {data?.title || 'Recent Posts'}
        </h2>
        <div className="flex flex-col justify-center md:flex-row gap-8 md:gap-4 w-full max-w-4xl">
          {isLoading
            ? VIDEO_SKELETON_KEYS.map((key) => <VideoCardSkeleton key={key} />)
            : videos?.map((video: VideoCardProps) => (
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
        className={'relative z-10 col-span-3 lg:col-span-1'}
      >
        <h3 className={`${CARD_TITLE} block text-center md:text-left pb-8`}>
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
                <span className={BODY_MUTED}>{formatDate(post.date)}</span>
                <DynamicLink href={href} passHref>
                  <h3 className={`${SUB_HEADING} ${TITLE_LINK} inline-block`}>
                    {post.title}
                  </h3>
                </DynamicLink>
                <RichTextWrapper>
                  <div className="flex flex-row mb-3 text-center justify-between">
                    <div className="flex">
                      <span className={BODY_MUTED}>By {post.author}</span>{' '}
                    </div>
                  </div>
                </RichTextWrapper>
              </div>
            );
          })}
          <Link
            href="/blog"
            className={`${EYEBROW_LINK} flex gap-2 pt-2 items-center -mt-4 lg:-mt-10`}
          >
            READ MORE BLOGS
            <FaArrowRightLong className="pr-1" />
          </Link>
        </div>
      </section>
    </Container>
  );
};

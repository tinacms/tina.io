import { RichTextWrapper } from 'components/layout/RichTextWrapper';
import { DynamicLink } from 'components/ui';
import { tinaField } from 'tinacms/dist/react';
import { getExcerpt } from 'utils/getExcerpt';
import { BLOCK_HEADINGS_SIZE } from '@/component/styles/typography';
import Container from '@/component/util/Container';
import Link from 'next/link';

const getPostHref = (path) => {
  let processedPath = path.replace(/^content/, '').replace(/\.mdx$/, '');
  processedPath = processedPath.replace('/blog-zh', '/zh/blog');
  return processedPath;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const year = date.getUTCFullYear();

  return `${day} ${month}, ${year}`;
}

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  console.log(data);
  console.log(recentPosts.edges[0].node.date)
  return (
    <Container size="medium" className="grid grid-cols-5 gap-10">
      <section className="col-span-3 flex flex-col gap-8 border border-red-500">
        <h2
          className={`${BLOCK_HEADINGS_SIZE} font-ibm-plex pb-8 lg:leading-tight text-black text-balance`}
          data-tina-field={tinaField(data, 'title')}
        >
          {data?.title || 'Recent Posts'}
        </h2>
      </section>
      <section
        key={`recent-posts-${index}`}
        className={
          'relative z-10 py-20 lg:py-28 border border-blue-500 col-span-2'
        }
      >
        {data.title && (
          <div className="flex items-center mb-12 lg:mb-14 gap-6">
            <hr className="my-0" />
          </div>
        )}
        <div className="flex flex-wrap gap-12 lg:gap-16">
          {recentPosts.edges.map(({ node: post }) => {
            const slug = post._sys.filename;
            const href = getPostHref(post._sys.path);
            return (
              <div key={slug} className="group flex-1 flex flex-col gap-2 items-start min-w-[20rem]">
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

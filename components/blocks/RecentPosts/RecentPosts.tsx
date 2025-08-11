import { RichTextWrapper } from 'components/layout/RichTextWrapper';
import { DynamicLink } from 'components/ui';
import { tinaField } from 'tinacms/dist/react';
import { formatDate } from 'utils/blog_helpers';
import { getExcerpt } from 'utils/getExcerpt';
import { Container } from '../Container';
import { BLOCK_HEADINGS } from '@/component/styles/typography';

const getPostHref = (path) => {
  let processedPath = path.replace(/^content/, '').replace(/\.mdx$/, '');
  processedPath = processedPath.replace('/blog-zh', '/zh/blog');
  return processedPath;
};

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  return (
    <section
      key={`recent-posts-${index}`}
      className={'bg-white relative z-10 py-20 lg:py-28'}
    >
      <Container width="narrow">
        {data.title && (
          <div className="flex items-center mb-12 lg:mb-14 gap-6">
            <h2
              className={`${BLOCK_HEADINGS} font-ibm-plex m-auto inline-block pb-8 lg:leading-tight bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent text-balance text-center lg:text-left`}
              data-tina-field={tinaField(data, 'title')}
            >
              {data?.title || 'Recent Posts'}
            </h2>
            <hr className="my-0" />
          </div>
        )}
        <div className="flex flex-wrap gap-12 lg:gap-16">
          {recentPosts.edges.map(({ node: post }) => {
            const slug = post._sys.filename;
            const href = getPostHref(post._sys.path);
            return (
              <DynamicLink key={slug} href={href} passHref>
                <div className="group flex-1 flex flex-col gap-6 items-start min-w-[20rem]">
                  <h3 className="font-ibm-plex inline-block text-3xl lg:text-4xl lg:leading-tight bg-linear-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
                    {post.title}
                  </h3>
                  <RichTextWrapper>
                    <div className="flex flex-row mb-3 text-center justify-between">
                      <strong>{formatDate(post.date)}</strong>
                      <div className="flex">
                        <span className="opacity-70 mr-1">By</span>{' '}
                        <strong>{post.author}</strong>
                      </div>
                    </div>
                    {getExcerpt(post.body, 200)}
                  </RichTextWrapper>
                </div>
              </DynamicLink>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

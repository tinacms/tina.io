import { RichTextWrapper } from 'components/layout/RichTextWrapper';
import { DynamicLink } from 'components/ui';
import { formatDate } from 'utils/blog_helpers';
import { getExcerpt } from 'utils/getExcerpt';
import { Container } from '../Container';
import { styled } from 'styled-components';

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  return (

    <section
      key={'recent-posts-' + index}
      className={'bg-white relative z-10 py-20 lg:py-28'}
    >
      <Container width="wide">
        {data.title && (
          <div className="flex items-center mb-12 lg:mb-14 gap-6">
            <h3 className="font-tuner flex-shrink-0 inline-block mx-auto text-center text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              {data.title}
            </h3>
            <hr className="my-0" />
          </div>
        )}
        <div className="w-full flex flex-wrap gap-12 lg:gap-16">
          {recentPosts.edges.map(({ node: post }) => {
            const slug = post._sys.filename;
            return (
              <DynamicLink key={slug} href={`/blog/${slug}`} passHref>
                <div className="group flex-1 flex flex-col gap-6 items-start min-w-[24rem]">
                  <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent">
                    {post.title}
                  </h3>
                  <RichTextWrapper>
                    <BlogMeta>
                      <MetaBit>
                        <strong>{formatDate(post.date)}</strong>
                      </MetaBit>
                      <MetaBit>
                        <span>By</span> <strong>{post.author}</strong>
                      </MetaBit>
                    </BlogMeta>
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

/*
 ** STYLES ---------------------------------------------------------
 */

 const BlogMeta = styled.div`
 width: 100%;
 justify-content: center;
 align-items: center;
 display: flex;
 flex-direction: row;
 margin-bottom: 3rem;
 margin-top: -0.5rem;
 text-align: center;
 @media (min-width: 550px) {
   flex-direction: row;
 }
`

const MetaWrap = styled.span`
 opacity: 0.8;
 display: flex;
 flex-direction: column;
 align-items: center;
`

const MetaBit = styled.p`
 display: flex;
 margin: 0 !important;
 span {
   opacity: 0.7;
   margin-right: 0.25rem;
 }
`

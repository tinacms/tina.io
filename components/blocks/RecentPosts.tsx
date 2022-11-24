import { RichTextWrapper } from 'components/layout/RichTextWrapper'
import { DynamicLink } from 'components/ui'
import { BlogMeta, MetaBit } from 'pages/blog/page/[page_index]'
import React from 'react'
import { formatDate } from 'utils/blog_helpers'
import { getExcerpt } from 'utils/getExcerpt'
import { Container } from './Container'

export const RecentPostsBlock = ({ data, index, recentPosts }) => {
  return (
    <section
      key={'recent-posts-' + index}
      className={'bg-white relative z-10 py-16 lg:py-24'}
    >
      <Container width="wide">
        {data.title && (
          <div className="flex items-center mb-10 lg:mb-12 gap-6">
            <h3 className="font-tuner flex-shrink-0 inline-block mx-auto text-center text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
              {data.title}
            </h3>
            <hr className="my-0" />
          </div>
        )}
        <div className="w-full flex flex-wrap gap-12">
          {recentPosts.edges.map(({ node: post }) => {
            const slug = post['_sys']['filename']
            return (
              <DynamicLink key={slug} href={`/blog/${slug}`} passHref>
                <a className="group flex-1 min-w-[20rem]">
                  <h3 className="font-tuner inline-block text-3xl lg:text-4xl lg:leading-tight bg-gradient-to-br from-blue-700/70 via-blue-900/90 to-blue-1000 group-hover:from-orange-300 group-hover:via-orange-500 group-hover:to-orange-700 bg-clip-text text-transparent mb-4">
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
                </a>
              </DynamicLink>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

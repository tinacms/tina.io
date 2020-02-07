import matter from 'gray-matter'
import styled from 'styled-components'
import { readFile } from '../../utils/readFile'
import { formatDate, formatExcerpt } from '../../utils'

import {
  Layout,
  Hero,
  Wrapper,
  MarkdownContent,
  RichTextWrapper,
} from '../../components/layout'
import { NextSeo } from 'next-seo'
import siteData from '../../content/siteConfig.json'

export default function BlogTemplate(props) {
  const frontmatter = props.post.data
  const markdownBody = props.post.content
  const excerpt = formatExcerpt(props.post.content)
  return (
    <Layout pathname="/">
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | ' + siteData.title + ' Blog'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            {
              url:
                'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_70:' +
                encodeURI(frontmatter.title) +
                ',g_north_west,x_270,y_95,w_840,c_fit,co_rgb:EC4815/l_text:tuner-regular.ttf_35:' +
                encodeURI(frontmatter.author) +
                ',g_north_west,x_270,y_500,w_840,c_fit,co_rgb:241748/v1581087220/TinaCMS/tinacms-social-empty.png',
              width: 1200,
              height: 628,
              alt: frontmatter.title + ` | TinaCMS Blog`,
            },
          ],
        }}
      />
      <Hero>{frontmatter.title}</Hero>
      <BlogWrapper>
        <RichTextWrapper>
          <BlogMeta>
            <p>
              <span>By</span> {frontmatter.author}
            </p>
            <p>{formatDate(frontmatter.date)}</p>
          </BlogMeta>
          <MarkdownContent escapeHtml={false} content={markdownBody} />
        </RichTextWrapper>
      </BlogWrapper>
    </Layout>
  )
}

export async function unstable_getServerProps(ctx) {
  const { slug } = ctx.params
  //TODO - change to fs.readFile once we move to getServerProps
  const content = await readFile(`content/blog/${slug}.md`)
  const post = matter(content)

  return {
    props: {
      // fileRelativePath: `src/posts/${slug}.md`,
      post: {
        data: { ...post.data, slug },
        content: post.content,
      },
    },
  }
}

export async function disabled_unstable_getStaticPaths() {
  const fg = require('fast-glob')
  const blogs = await fg(`./content/blog/**/*.md`)
  return blogs.map(file => {
    const slug = file
      .split('/blog/')[1]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim()
    return { params: { slug } }
  })
}

const BlogWrapper = styled(Wrapper)`
  padding-top: 4rem;
  padding-bottom: 3rem;
  max-width: 768px;

  h1,
  .h1,
  h2,
  .h2 {
    color: var(--color-primary);
    em {
      color: var(--color-primary);
      font-style: italic;
    }
  }

  h3,
  .h3,
  h4,
  .h4 {
    color: var(--color-secondary);
    em {
      color: var(--color-secondary);
      font-style: italic;
    }
  }

  h1,
  .h1 {
    font-size: 2rem;
    gi @media (min-width: 800px) {
      font-size: 3rem;
    }

    @media (min-width: 1200px) {
      font-size: 2.5rem;
    }
  }

  h2,
  .h2 {
    font-size: 1.625rem;
  }
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: -0.5rem;
  opacity: 0.5;
  p {
    margin: 0;
    color: 0;
    display: block;
  }
  span {
    opacity: 0.5;
  }

  @media (min-width: 550px) {
    flex-direction: row;
  }
`

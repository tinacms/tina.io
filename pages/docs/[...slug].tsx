import React, { useState } from 'react'
import matter from 'gray-matter'
import styled from 'styled-components'

import siteData from '../../content/siteConfig.json'
import { formatExcerpt } from '../../utils'
import {
  DocsLayout,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
} from '../../components/layout'
import {
  DocsNav,
  NavToggle,
  HeaderNav,
  Overlay,
  DocsPagination,
} from '../../components/ui'
import { TinaIcon } from '../../components/logo/TinaIcon'
import { readFile } from '../../utils/readFile'
import { NextSeo } from 'next-seo'

export default function DocTemplate(props) {
  const [open, setOpen] = useState(false)
  const frontmatter = props.doc.data
  const markdownBody = props.doc.content
  const excerpt = formatExcerpt(props.doc.content)
  return (
    <DocsLayout>
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | ' + siteData.title + ' Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            {
              url:
                'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_90_center:' +
                encodeURI(frontmatter.title) +
                ',g_center,x_0,y_50,w_850,c_fit,co_rgb:EC4815/v1581087220/TinaCMS/tinacms-social-empty-docs.png',
              width: 1200,
              height: 628,
              alt: frontmatter.title + ` | TinaCMS Docs`,
            },
          ],
        }}
      />
      <DocsTinaIcon />
      <DocsNav open={open} navItems={props.docsNav} />
      <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
      <DocsContent>
        <DocsHeaderNav color={'light'} open={open} />
        <RichTextWrapper>
          <Wrapper narrow>
            <h1>{frontmatter.title}</h1>
            <hr />
            <MarkdownContent escapeHtml={false} content={markdownBody} />
            <DocsPagination
              prevPage={props.prevPage}
              nextPage={props.nextPage}
            />
          </Wrapper>
        </RichTextWrapper>
      </DocsContent>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </DocsLayout>
  )
}

export async function unstable_getStaticProps(ctx) {
  let { slug: slugs } = ctx.params

  const slug = slugs.join('/')
  const content = await readFile(`content/docs/${slug}.md`)
  const doc = matter(content)

  const docsNavData = await import('../../content/toc-doc.json')
  const nextDocPage =
    doc.data.next && matter(await readFile(`content${doc.data.next}.md`))
  const prevDocPage =
    doc.data.prev && matter(await readFile(`content${doc.data.prev}.md`))

  return {
    props: {
      doc: {
        data: { ...doc.data, slug },
        content: doc.content,
      },
      docsNav: docsNavData.default,
      nextPage: {
        slug: doc.data.next,
        title: nextDocPage && nextDocPage.data.title,
      },
      prevPage: {
        slug: doc.data.prev,
        title: prevDocPage && prevDocPage.data.title,
      },
    },
  }
}

export async function unstable_getStaticPaths() {
  const fg = require('fast-glob')
  const contentDir = './content/docs/'
  const files = await fg(`${contentDir}**/*.md`)
  return files
    .filter(file => !file.endsWith('index.md'))
    .map(file => {
      const path = file.substring(contentDir.length, file.length - 3)
      return { params: { slug: path.split('/') } }
    })
}

const DocsNavToggle = styled(NavToggle)`
  position: fixed;
  top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`

const DocsTinaIcon = styled(TinaIcon)`
  position: relative;
  display: block;
  padding: 1rem 0;

  h1 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 999px) {
    display: none;
    left: 2rem;
    transform: translate3d(0, -50%, 0);
    position: fixed;
    top: 2.5rem;
    left: 2rem;
  }
`

const DocsHeaderNav = styled(HeaderNav)`
  justify-content: flex-end;
  padding: 1rem 0;

  @media (max-width: 999px) {
    display: none;
  }
`

const DocsContent = styled.div`
  grid-area: content;
  overflow-y: auto;

  ${Wrapper} {
    padding-top: 2rem;
    padding-bottom: 3rem;
  }

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
    @media (min-width: 800px) {
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

import React, { useState } from 'react'
import matter from 'gray-matter'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { InlineForm } from 'react-tinacms-inline'

import { formatExcerpt, readFile } from '../../utils'
import {
  DocsLayout,
  MarkdownContent,
  RichTextWrapper,
  Wrapper,
  Footer,
} from '../../components/layout'
import {
  DocsNav,
  NavToggle,
  HeaderNav,
  Overlay,
  DocsPagination,
} from '../../components/ui'
import { InlineWysiwyg, InlineTextField } from '../../components/ui/inline'
import { TinaIcon } from '../../components/logo'
import getMarkdownData from '../../utils/github/getMarkdownData'
import { getGithubDataFromPreviewProps } from '../../utils/github/sourceProviderConnection'
import { useLocalGithubMarkdownForm } from '../../utils/github/useLocalGithubMarkdownForm'
import { setIsEditMode } from '../../utils'

export default function DocTemplate(props) {
  // Sets sidebar.hidden based on preview props
  setIsEditMode(props.editMode)

  // Workaround for fallback being not implemented
  if (!props.markdownFile) {
    return <div></div>
  }

  // Registers Tina Form
  const [data, form] = useLocalGithubMarkdownForm(
    props.markdownFile,
    formOptions,
    props.sourceProviderConnection,
    props.editMode
  )
  const [open, setOpen] = useState(false)
  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = formatExcerpt(props.markdownFile.data.markdownBody)

  return (
    <InlineForm form={form}>
      <DocsLayout>
        <NextSeo
          title={frontmatter.title}
          titleTemplate={'%s | TinaCMS Docs'}
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
              {/*
               *** Inline controls shouldn't render
               *** until we're ready for Inline release
               */}
              {/*
                <InlineControls>
                <EditToggle />
                <DiscardButton />
                </InlineControls>
              */}
              <h1>
                <InlineTextField name="frontmatter.title" />
              </h1>
              <hr />
              <InlineWysiwyg name="markdownBody">
                <MarkdownContent escapeHtml={false} content={markdownBody} />
              </InlineWysiwyg>
              <DocsPagination
                prevPage={props.prevPage}
                nextPage={props.nextPage}
              />
            </Wrapper>
          </RichTextWrapper>
          <Footer light />
        </DocsContent>
        <Overlay open={open} onClick={() => setOpen(false)} />
      </DocsLayout>
    </InlineForm>
  )
}

/*
 * DATA FETCHING ------------------------------------------------------
 */

export async function unstable_getStaticProps({
  preview,
  previewData,
  ...ctx
}) {
  let { slug: slugs } = ctx.params

  const slug = slugs.join('/')

  const sourceProviderConnection = getGithubDataFromPreviewProps(previewData)
  const file = await getMarkdownData(
    `content/docs/${slug}.md`,
    sourceProviderConnection
  )

  const docsNavData = await import('../../content/toc-doc.json')
  const nextDocPage =
    file.data.frontmatter.next &&
    matter(await readFile(`content${file.data.frontmatter.next}.md`))
  const prevDocPage =
    file.data.frontmatter.prev &&
    matter(await readFile(`content${file.data.frontmatter.prev}.md`))

  return {
    props: {
      markdownFile: file,
      sourceProviderConnection,
      editMode: !!preview,
      docsNav: docsNavData.default,
      nextPage: {
        slug: file.data.frontmatter.next,
        title: nextDocPage && nextDocPage.data.title,
      },
      prevPage: {
        slug: file.data.frontmatter.prev,
        title: prevDocPage && prevDocPage.data.title,
      },
    },
    revalidate: 3156400,
  }
}

export async function unstable_getStaticPaths() {
  const fg = require('fast-glob')
  const contentDir = './content/docs/'
  const files = await fg(`${contentDir}**/*.md`)
  return {
    paths: files
      .filter(file => !file.endsWith('index.md'))
      .map(file => {
        const path = file.substring(contentDir.length, file.length - 3)
        return { params: { slug: path.split('/') } }
      }),
  }
}

/*
 * TINA FORM CONFIG -----------------------------------------------------
 */

const formOptions = {
  label: 'Tina Doc',
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      component: 'text',
    },
    {
      label: 'Previous Doc',
      name: 'frontmatter.prev',
      component: 'text',
    },
    {
      label: 'Next Doc',
      name: 'frontmatter.next',
      component: 'text',
    },
    {
      label: 'Documentation Body',
      name: 'markdownBody',
      component: 'markdown',
    },
  ],
}

/*
 * STYLES --------------------------------------------------------------
 */

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

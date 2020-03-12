import React, { useState } from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
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
import { InlineWysiwyg, InlineTextareaField } from '../../components/ui/inline'
import { TinaIcon } from '../../components/logo'
import { useLocalGithubMarkdownForm } from '../../utils/github/useLocalGithubMarkdownForm'
import { getDocProps } from '../../utils/docs/getDocProps'
import OpenAuthoringSiteForm from '../../components/layout/OpenAuthoringSiteForm'
import ContentNotFoundError from '../../utils/github/ContentNotFoundError'
import { OpenAuthoringModalContainer } from '../../open-authoring/OpenAuthoringModalContainer'
import OpenAuthoringError from '../../open-authoring/OpenAuthoringError'

export default function DocTemplate(props) {
  // Workaround for fallback being not implemented
  if (!props.markdownFile) {
    return <OpenAuthoringModalContainer error={props.error} />
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
  const excerpt = props.markdownFile.data.excerpt

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={props.markdownFile.fileRelativePath}
      editMode={props.editMode}
      error={props.error}
    >
      <DocsLayout isEditing={props.editMode}>
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
        <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
        <DocsMobileTinaIcon />
        <DocsNav open={open} navItems={props.docsNav} />
        <DocsContent>
          <DocsHeaderNav color={'light'} open={open} />
          <RichTextWrapper>
            <Wrapper narrow>
              <h1>
                <InlineTextareaField name="frontmatter.title" />
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
          <Footer light editMode={props.editMode} />
        </DocsContent>
        <Overlay open={open} onClick={() => setOpen(false)} />
      </DocsLayout>
    </OpenAuthoringSiteForm>
  )
}

/*
 * DATA FETCHING ------------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function(props) {
  let { slug: slugs } = props.params

  // @ts-ignore This should maybe always be a string[]?
  const slug = slugs.join('/')

  try {
    return getDocProps(props, slug)
  } catch (e) {
    if (e instanceof OpenAuthoringError) {
      return {
        props: {
          error: e,
        },
      }
    } else {
      throw e
    }
  }
}

export async function getStaticPaths() {
  const fg = require('fast-glob')
  const contentDir = './content/docs/'
  const files = await fg(`${contentDir}**/*.md`)
  return {
    fallback: true,
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
  margin-top: 1.25rem;
  left: 1rem;
  z-index: 500;

  @media (min-width: 999px) {
    display: none;
  }
`

const DocsMobileTinaIcon = styled(TinaIcon)`
  position: relative;
  display: block;
  padding: 1rem 0;

  h1 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 1000px) {
    display: none;
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

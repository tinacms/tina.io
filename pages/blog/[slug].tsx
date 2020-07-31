import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps, GetStaticPaths } from 'next'
import { CloseIcon, EditIcon } from '@tinacms/icons'
import { formatDate } from '../../utils'
import {
  Layout,
  Hero,
  Wrapper,
  MarkdownContent,
  DocsTextWrapper,
} from 'components/layout'
import { InlineTextareaField } from 'react-tinacms-inline'
import { useGithubMarkdownForm } from 'react-tinacms-github'
import { fileToUrl } from 'utils/urls'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
const fg = require('fast-glob')
import { Button } from 'components/ui/Button'
import Error from 'next/error'
import { getMarkdownPreviewProps } from 'utils/getMarkdownFile'
import { InlineWysiwyg } from 'components/inline-wysiwyg'
import { usePlugin, useCMS } from 'tinacms'
import { useEffect } from 'react'
import { useLastEdited } from 'utils/useLastEdited'
import { LastEdited } from 'components/ui'

function BlogTemplate({ file, siteConfig, preview }) {
  // fallback workaround
  if (!file) {
    return <Error statusCode={404} />
  }

  // Registers Tina Form
  const [data, form] = useGithubMarkdownForm(file, formOptions)

  usePlugin(form)
  useLastEdited(form)

  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = data.excerpt

  return (
    <InlineGithubForm form={form}>
      <Layout>
        <NextSeo
          title={frontmatter.title}
          titleTemplate={'%s | ' + siteConfig.title + ' Blog'}
          description={excerpt}
          openGraph={{
            title: frontmatter.title,
            description: excerpt,
            images: [
              {
                url:
                  'https://res.cloudinary.com/forestry-demo/image/upload/l_text:tuner-regular.ttf_70:' +
                  encodeURIComponent(frontmatter.title) +
                  ',g_north_west,x_270,y_95,w_840,c_fit,co_rgb:EC4815/l_text:tuner-regular.ttf_35:' +
                  encodeURIComponent(frontmatter.author) +
                  ',g_north_west,x_270,y_500,w_840,c_fit,co_rgb:241748/v1581087220/TinaCMS/tinacms-social-empty.png',
                width: 1200,
                height: 628,
                alt: frontmatter.title + ` | TinaCMS Blog`,
              },
            ],
          }}
        />
        <Hero>
          <InlineTextareaField name="frontmatter.title" />
        </Hero>
        <BlogWrapper>
          <DocsTextWrapper>
            <BlogMeta>
              <MetaWrap>
                <MetaBit>{formatDate(frontmatter.date)}</MetaBit>
                <MetaBit>
                  <span>By</span>{' '}
                  <InlineTextareaField name="frontmatter.author" />
                </MetaBit>
              </MetaWrap>
              <EditLink />
            </BlogMeta>
            <InlineWysiwyg name="markdownBody">
              <MarkdownContent escapeHtml={false} content={markdownBody} />
            </InlineWysiwyg>
            <LastEdited date={frontmatter.last_edited} />
          </DocsTextWrapper>
        </BlogWrapper>
      </Layout>
    </InlineGithubForm>
  )
}

export default BlogTemplate

/*
 ** DATA FETCHING --------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
  ...ctx
}) {
  const { slug } = ctx.params

  //TODO - move to readFile
  const { default: siteConfig } = await import('../../content/siteConfig.json')

  const previewProps = await getMarkdownPreviewProps(
    `content/blog/${slug}.md`,
    preview,
    previewData
  )

  if ((previewProps.props.error?.status || '') === 'ENOENT') {
    return { props: {} } // will render the 404 error
  }

  return {
    props: {
      ...previewProps.props,
      siteConfig: { title: siteConfig.title },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  const blogs = await fg(`./content/blog/**/*.md`)
  return {
    paths: blogs.map(file => {
      const slug = fileToUrl(file, 'blog')
      return { params: { slug } }
    }),
    fallback: true,
  }
}

/*
 ** TINA FORM CONFIG --------------------------------------------------
 */

const formOptions = {
  label: 'Blog Post',
  fields: [
    {
      label: 'Title',
      name: 'frontmatter.title',
      component: 'text',
    },
    {
      label: 'Author',
      name: 'frontmatter.author',
      component: 'text',
    },
    /*
     ** TODO: add this back in once
     ** draft functionality works again
     */
    // {
    //   name: 'frontmatter.draft',
    //   component: 'toggle',
    //   label: 'Draft',
    // },
    {
      label: 'Date Posted',
      name: 'frontmatter.date',
      component: 'date',
      dateFormat: 'MMMM DD YYYY',
      timeFormat: false,
    },
    {
      label: 'Blog Body',
      name: 'markdownBody',
      component: 'markdown',
    },
  ],
}
/*
 ** STYLES ---------------------------------------------------------
 */

const BlogWrapper = styled(Wrapper)`
  padding-top: 4rem;
  padding-bottom: 3rem;
  max-width: 768px;
`

const BlogMeta = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
  margin-top: -0.5rem;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`

const MetaWrap = styled.span`
  opacity: 0.4;
`

const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  span {
    opacity: 0.5;
    margin-right: 0.25rem;
  }
`

/*
 ** Edit Button ------------------------------------------------------
 */

const EditLink = () => {
  const cms = useCMS()

  return (
    <EditButton id="OpenAuthoringBlogEditButton" onClick={cms.toggle}>
      {cms.enabled ? <CloseIcon /> : <EditIcon />}
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Post'}
    </EditButton>
  )
}

const EditButton = styled(Button)`
  background: none;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-primary);
  padding: 0 1.25rem;
  height: 45px;
  color: var(--color-primary);
  transition: all 150ms ease-out;
  transform: translate3d(0px, 0px, 0px);

  svg {
    fill: currentColor;
    margin: 0 4px 0 -4px;
  }
`

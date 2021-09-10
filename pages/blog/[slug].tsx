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
import { InlineTextarea } from 'react-tinacms-inline'
import { useGithubMarkdownForm } from 'react-tinacms-github'
import { fileToUrl } from 'utils/urls'
import { getPageRef } from 'utils/docs/getDocProps'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
const fg = require('fast-glob')
import { Button } from 'components/ui/Button'
import Error from 'next/error'
import { getMarkdownPreviewProps } from 'utils/getMarkdownPreviewProps'
import { InlineWysiwyg } from 'components/inline-wysiwyg'
import { usePlugin, useCMS } from 'tinacms'
import { useLastEdited } from 'utils/useLastEdited'
import { LastEdited, DocsPagination } from 'components/ui'
import { openGraphImage } from 'utils/open-graph-image'

function BlogTemplate({ file, siteConfig, prevPage, nextPage }) {
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
              frontmatter.opengraph?.image ||
                openGraphImage(
                  frontmatter.title,
                  ' | TinaCMS Blog',
                  frontmatter.author
                ),
            ],
          }}
        />
        <Hero>{frontmatter.title}</Hero>
        <BlogWrapper>
          <DocsTextWrapper>
            <BlogMeta>
              <MetaWrap>
                <MetaBit>{formatDate(frontmatter.date)}</MetaBit>
                <MetaBit>
                  <span>By</span>{' '}
                  <strong>
                    <InlineTextarea name="frontmatter.author" />
                  </strong>
                </MetaBit>
              </MetaWrap>
              <EditLink />
            </BlogMeta>
            <InlineWysiwyg
              name="markdownBody"
              imageProps={{
                uploadDir: () => '/img/blog',
                parse: media => `/img/blog/${media.filename}`,
              }}
            >
              <MarkdownContent escapeHtml={false} content={markdownBody} />
            </InlineWysiwyg>
            <LastEdited date={frontmatter.last_edited} />
            {(prevPage?.slug !== null || nextPage?.slug !== null) && (
              <DocsPagination prevPage={prevPage} nextPage={nextPage} />
            )}
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

  const currentBlog = await getMarkdownPreviewProps(
    `content/blog/${slug}.md`,
    preview,
    previewData
  )

  if ((currentBlog.props.error?.status || '') === 'ENOENT') {
    return { props: {} } // will render the 404 error
  }

  return {
    props: {
      ...currentBlog.props,
      nextPage: await getPageRef(
        currentBlog.props.file.data.frontmatter.next,
        preview,
        previewData
      ),
      prevPage: await getPageRef(
        currentBlog.props.file.data.frontmatter.prev,
        preview,
        previewData
      ),
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
  opacity: 0.8;
`

const MetaBit = styled.p`
  display: flex;
  margin: 0 !important;

  span {
    opacity: 0.7;
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
  border: 1px solid var(--color-orange);
  padding: 0 1.25rem;
  height: 45px;
  color: var(--color-orange);
  transition: all 150ms ease-out;
  transform: translate3d(0px, 0px, 0px);

  svg {
    fill: currentColor;
    margin: 0 4px 0 -4px;
  }
`

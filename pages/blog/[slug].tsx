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
  RichTextWrapper,
} from '../../components/layout'
import { InlineWysiwyg, InlineTextareaField } from '../../components/ui/inline'
import { getGithubDataFromPreviewProps } from 'github-tinacms-content'
import { getMarkdownFile } from '../../utils/getMarkdownFile'
import { useGithubMarkdownForm } from '../../utils/github/useGithubMarkdownForm'
import { fileToUrl } from '../../utils/urls'
import OpenAuthoringSiteForm from '../../components/layout/OpenAuthoringSiteForm'
const fg = require('fast-glob')
import { useOpenAuthoring } from '../../open-authoring/open-authoring/OpenAuthoringProvider'
import { Button } from '../../components/ui/Button'
import Error from 'next/error'
import { GithubError } from 'github-tinacms-content'

function BlogTemplate({
  markdownFile,
  sourceProviderConnection,
  siteConfig,
  editMode,
  previewError,
}) {
  // fallback workaround
  if (!markdownFile) {
    return <Error statusCode={404} />
  }

  // Registers Tina Form
  const [data, form] = useGithubMarkdownForm(
    markdownFile,
    formOptions,
    sourceProviderConnection
  )

  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = data.excerpt

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={markdownFile.fileRelativePath}
      editMode={editMode}
    >
      <Layout
        sourceProviderConnection={sourceProviderConnection}
        editMode={editMode}
      >
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
          <RichTextWrapper>
            <BlogMeta>
              <MetaWrap>
                <MetaBit>{formatDate(frontmatter.date)}</MetaBit>
                <MetaBit>
                  <span>By</span>{' '}
                  <InlineTextareaField name="frontmatter.author" />
                </MetaBit>
              </MetaWrap>
              <EditLink isEditMode={editMode} />
            </BlogMeta>
            <InlineWysiwyg name="markdownBody">
              <MarkdownContent escapeHtml={false} content={markdownBody} />
            </InlineWysiwyg>
          </RichTextWrapper>
        </BlogWrapper>
      </Layout>
    </OpenAuthoringSiteForm>
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

  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)

  let previewError: GithubError = null
  let file = {}
  try {
    file = await getMarkdownFile(
      `content/blog/${slug}.md`,
      sourceProviderConnection,
      accessToken
    )
  } catch (e) {
    if (e instanceof GithubError) {
      previewError = { ...e } //workaround since we cant return error as JSON
    } else if (e.status === 'ENOENT') {
      return { props: {} } // will render the 404 error
    } else {
      throw e
    }
  }

  //TODO - move to readFile
  const { default: siteConfig } = await import('../../content/siteConfig.json')

  return {
    props: {
      sourceProviderConnection,
      editMode: !!preview,
      previewError: previewError,
      siteConfig: {
        title: siteConfig.title,
      },
      markdownFile: file,
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

const EditLink = ({ isEditMode }) => {
  const openAuthoring = useOpenAuthoring()

  return (
    <EditButton
      id="OpenAuthoringBlogEditButton"
      onClick={
        isEditMode ? openAuthoring.exitEditMode : openAuthoring.enterEditMode
      }
    >
      {isEditMode ? <CloseIcon /> : <EditIcon />}
      {isEditMode ? 'Exit Edit Mode' : 'Edit This Post'}
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

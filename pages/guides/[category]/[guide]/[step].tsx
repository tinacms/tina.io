import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { readFile } from '../../../../utils/readFile'
import { getMarkdownPreviewProps } from '../../../../utils/getMarkdownFile'
import {
  DocsLayout,
  DocsTextWrapper,
  Wrapper,
  MarkdownContent,
  Footer,
} from '../../../../components/layout'
import { NextSeo } from 'next-seo'
import { DocsNav, DocsPagination, Overlay } from '../../../../components/ui'
import {
  DocsNavToggle,
  DocsMobileTinaIcon,
  DocsContent,
  DocsHeaderNav,
} from '../../../docs/[...slug]'
import { useRouter } from 'next/router'
import { getGuideNavProps } from '../../../../utils/guide_helpers'
import { useMemo } from 'react'
import { OpenAuthoringSiteForm } from '../../../../components/layout/OpenAuthoringSiteForm'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { InlineTextareaField } from 'react-tinacms-inline'
import { useGithubMarkdownForm, useGithubJsonForm } from 'react-tinacms-github'
import { InlineWysiwyg } from '../../../../components/inline-wysiwyg'
import { getJsonPreviewProps } from '../../../../utils/getJsonPreviewProps'

export default function GuideTemplate(props) {
  const [open, setOpen] = React.useState(false)
  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = props.markdownFile.data.excerpt

  const router = useRouter()
  const currentPath = router.asPath

  const [, stepForm] = useGithubMarkdownForm(props.markdownFile)
  const [guide, guideForm] = useGithubJsonForm(props.guideMeta, {
    label: 'Guide Metadata',
    fields: [
      { component: 'text', name: 'title', label: 'Title' },
      {
        name: 'steps',
        component: 'group-list',
        // @ts-ignore
        itemProps: step => ({
          label: step.title,
        }),
        fields: [
          { component: 'text', name: 'title' },
          { component: 'text', name: 'id' },
          { component: 'text', name: 'slug' },
          { component: 'text', name: 'data' },
        ],
      },
    ],
  })

  usePlugin(stepForm)
  useFormScreenPlugin(guideForm)

  const guideTitle = guide?.title || 'TinaCMS Guides'

  let navData = useMemo(() => {
    if (guide) {
      return [
        {
          title: guide.title,
          id: guide.title,
          collapsible: false,
          items: guide.steps,
          returnLink: {
            url: '/guides',
            label: '‹ Back to Guides',
          },
        },
      ]
    } else {
      return props.allGuides
    }
  }, [guide, props.allGuides])

  const { prev, next } = React.useMemo(() => {
    if (!guide) {
      return { prev: null, next: null }
    }
    let prev = null,
      next = null
    const allSteps = guide.steps
    const currentItemIndex = allSteps.findIndex(
      step => step.slug == currentPath
    )
    if (currentItemIndex >= 0) {
      prev = allSteps[currentItemIndex - 1]

      if (currentItemIndex < allSteps.length - 1) {
        next = allSteps[currentItemIndex + 1]
      }
    }

    return { prev, next }
  }, [guide, currentPath])

  return (
    <OpenAuthoringSiteForm
      form={stepForm}
      path={props.markdownFile.fileRelativePath}
      preview={props.preview}
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
                  encodeURIComponent(guideTitle) +
                  ',g_center,x_0,y_50,w_850,c_fit,co_rgb:EC4815/v1581087220/TinaCMS/tinacms-social-empty-docs.png',
                width: 1200,
                height: 628,
                alt: guideTitle,
              },
            ],
          }}
        />
        <DocsNavToggle open={open} onClick={() => setOpen(!open)} />
        <DocsMobileTinaIcon />
        <DocsNav open={open} navItems={navData} />
        <DocsContent>
          <DocsHeaderNav color={'light'} open={open} />
          <DocsTextWrapper>
            <Wrapper narrow>
              <h1>
                <InlineTextareaField name="frontmatter.title" />
              </h1>
              <hr />
              <InlineWysiwyg name="markdownBody">
                <MarkdownContent escapeHtml={false} content={markdownBody} />
              </InlineWysiwyg>
              <DocsPagination prevPage={prev} nextPage={next} />
            </Wrapper>
          </DocsTextWrapper>
          <Footer light editMode={props.editMode} />
        </DocsContent>
        <Overlay open={open} onClick={() => setOpen(false)} />
      </DocsLayout>
    </OpenAuthoringSiteForm>
  )
}

export const getStaticProps: GetStaticProps = async function(ctx) {
  const path = require('path')
  const { category, guide, step } = ctx.params
  const pathToGuide = path.join(
    process.cwd(),
    './content/guides',
    category,
    guide
  )
  const {
    props: { file: guideMeta },
  } = await getJsonPreviewProps(
    `content/guides/${category}/${guide}/meta.json`,
    ctx.preview,
    ctx.previewData
  )

  const {
    props: { preview, file: markdownFile },
  } = await getMarkdownPreviewProps(
    `content/guides/${category}/${guide}/${step}.md`,
    ctx.preview,
    ctx.previewData
  )

  return {
    props: {
      preview,
      currentGuide: guideMeta.data,
      guideMeta,
      markdownFile,
      allGuides: await getGuideNavProps(),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function() {
  const fg = require('fast-glob')
  const contentDir = './content/'
  const rawPaths = await fg(`${contentDir}/guides/*/*/*.md`)
  const captureUrlParams = /\/guides\/([^\/]+)\/([^\/]+)\/([^\/]+)/
  return {
    paths: rawPaths.map(path => {
      const slug = path.substring(contentDir.length, path.length - 3)
      const [, category, guide, step] = captureUrlParams.exec(slug)
      return {
        params: { category, guide, step },
      }
    }),
    fallback: false,
  }
}

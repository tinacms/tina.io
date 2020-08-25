import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getMarkdownPreviewProps } from 'utils/getMarkdownPreviewProps'
import { DocsLayout, MarkdownContent } from 'components/layout'
import { NextSeo } from 'next-seo'
import { DocsPagination, LastEdited } from 'components/ui'
import {
  DocsGrid,
  DocGridHeader,
  DocsPageTitle,
  DocGridToc,
  DocGridContent,
} from '../../../docs/[...slug]'
import { useRouter } from 'next/router'
import { getGuideNavProps } from 'utils/guide_helpers'
import { useMemo } from 'react'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { InlineTextareaField } from 'react-tinacms-inline'
import { useGithubMarkdownForm, useGithubJsonForm } from 'react-tinacms-github'
import { InlineWysiwyg } from 'components/inline-wysiwyg'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { MarkdownCreatorPlugin } from 'utils/plugins'
import { fileToUrl, createTocListener } from 'utils'
import Toc from '../../../../components/toc'
import { useLastEdited } from 'utils/useLastEdited'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
import { NavSectionProps } from 'components/DocumentationNavigation'
import { openGraphImage } from 'utils/open-graph-image'

interface GuideTemplateProps {
  tocItems: string
  breadcrumb: { category: string }
  guideMeta: GitFile
  markdownFile: GitFile
  allGuides: NavSectionProps[]
}

type GitFile = {
  fileRelativePath: string
  sha: string
  data: any
}

export default function GuideTemplate({
  tocItems,
  breadcrumb,
  guideMeta,
  markdownFile,
  allGuides,
}: GuideTemplateProps) {
  const isBrowser = typeof window !== `undefined`
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [activeIds, setActiveIds] = React.useState([])
  const router = useRouter()
  const currentPath = router.asPath
  const excerpt = markdownFile.data.excerpt

  /** Handles active TOC */
  React.useEffect(() => {
    if (!isBrowser || !contentRef.current) {
      return
    }

    const activeTocListener = createTocListener(contentRef, setActiveIds)
    window.addEventListener('scroll', activeTocListener)

    return () => window.removeEventListener('scroll', activeTocListener)
  }, [contentRef])

  const [{ frontmatter, markdownBody }, stepForm] = useGithubMarkdownForm(
    markdownFile
  )

  const [guide, guideForm] = useGithubJsonForm(guideMeta, {
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

  const guideTitle = guide?.title || 'TinaCMS Guides'
  const guideNav = useGuideNav(guide, allGuides)
  const { prev, next } = usePrevNextSteps(guide, currentPath)

  usePlugin(
    useMemo(
      () =>
        new MarkdownCreatorPlugin({
          label: 'Step',
          fields: [
            { name: 'title', label: 'Title', component: 'text' },
            { name: 'slug', label: 'Slug', component: 'text' },
          ],
          filename({ slug }) {
            return `content/guides/nextjs/github/${slug}.md`
          },
          frontmatter({ title }) {
            return { title }
          },
          body() {
            return 'A step in the right direction.'
          },
          async afterCreate(response) {
            let url = fileToUrl(
              response.content.path.split('content')[1],
              'guides'
            )

            guideForm.mutators.push('steps', {
              title: url,
              id: `/guides/${url}`,
              slug: `/guides/${url}`,
              data: `./${url.split('/').slice(-1)[0]}.md`,
            })

            await guideForm.submit()

            window.location.href = `/guides/${url}`
          },
        }),
      []
    )
  )
  usePlugin(stepForm)
  useFormScreenPlugin(guideForm)
  useLastEdited(stepForm)

  return (
    <InlineGithubForm form={stepForm}>
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [
            openGraphImage(guideTitle, ' | TinaCMS Docs', frontmatter.title),
          ],
        }}
      />
      <DocsLayout navItems={guideNav} guide={breadcrumb}>
        <DocsGrid>
          <DocGridHeader>
            <DocsPageTitle>
              <InlineTextareaField name="frontmatter.title" />
            </DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            <InlineWysiwyg name="markdownBody">
              <MarkdownContent escapeHtml={false} content={markdownBody} />
            </InlineWysiwyg>
            <LastEdited date={frontmatter.last_edited} />
            <DocsPagination prevPage={prev} nextPage={next} />
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </InlineGithubForm>
  )
}

export const getStaticProps: GetStaticProps = async function(ctx) {
  const { category, guide, step } = ctx.params
  const {
    props: { file: guideMeta },
  } = await getJsonPreviewProps(
    `content/guides/${category}/${guide}/meta.json`,
    ctx.preview,
    ctx.previewData
  )

  const {
    props: { preview, file: markdownFile, tocItems },
  } = await getMarkdownPreviewProps(
    `content/guides/${category}/${guide}/${step}.md`,
    ctx.preview,
    ctx.previewData
  )

  return {
    props: {
      preview,
      currentGuide: guideMeta.data,
      breadcrumb: {
        category,
      },
      guideMeta,
      markdownFile,
      allGuides: await getGuideNavProps(),
      tocItems,
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

function useGuideNav(guide: any, allGuides: any) {
  return useMemo(() => {
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
      return allGuides
    }
  }, [guide, allGuides])
}

function usePrevNextSteps(guide: any, currentPath: string) {
  return React.useMemo(() => {
    if (!guide) {
      return { prev: null, next: null }
    }
    let prev = null,
      next = null
    const currentPathStripped = currentPath.replace(/\/$/, '')
    const allSteps = guide.steps
    const currentItemIndex = allSteps.findIndex(
      step => step.slug.replace(/\/$/, '') == currentPathStripped
    )
    if (currentItemIndex >= 0) {
      prev = allSteps[currentItemIndex - 1]

      if (currentItemIndex < allSteps.length - 1) {
        next = allSteps[currentItemIndex + 1]
      }
    }

    return { prev, next }
  }, [guide, currentPath])
}

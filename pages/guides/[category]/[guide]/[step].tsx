import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { readFile } from '../../../../utils/readFile'
import { readMarkdownFile } from '../../../../utils/getMarkdownFile'
import {
  DocsLayout,
  DocsTextWrapper,
  Wrapper,
  MarkdownContent,
  Footer,
} from '../../../../components/layout'
import { NextSeo } from 'next-seo'
import { DocsNav, DocsPagination, Overlay } from '../../../../components/ui'
import { InlineTextareaField, InlineWysiwyg } from 'react-tinacms-inline'
import {
  DocsNavToggle,
  DocsMobileTinaIcon,
  DocsContent,
  DocsHeaderNav,
} from '../../../docs/[...slug]'
import { useRouter } from 'next/router'
import { getGuideNavProps } from '../../../../utils/guide_helpers'
import { useMemo } from 'react'

export default function GuideTemplate(props) {
  let data = props.markdownFile.data
  const [open, setOpen] = React.useState(false)
  const frontmatter = data.frontmatter
  const markdownBody = data.markdownBody
  const excerpt = props.markdownFile.data.excerpt

  let navData = useMemo(() => {
    if (props.currentGuide) {
      return [
        {
          title: props.currentGuide.title,
          id: props.currentGuide.title,
          collapsible: false,
          items: props.currentGuide.steps,
          returnLink: {
            url: '/guides',
            label: '‹ Back to Guides',
          },
        },
      ]
    } else {
      return props.allGuides
    }
  }, [props.currentGuide, props.allGuides])

  const router = useRouter()
  const currentPath = router.asPath

  const guideTitle = props.currentGuide
    ? props.currentGuide.title
    : 'TinaCMS Guides'

  const { prev, next } = React.useMemo(() => {
    if (!props.currentGuide) {
      return { prev: null, next: null }
    }
    let prev = null,
      next = null
    const allSteps = props.currentGuide.steps
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
  }, [props.currentGuide, currentPath])

  return (
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
              {frontmatter.title}
              {/* <InlineTextareaField name="frontmatter.title" /> */}
            </h1>
            <hr />
            {/* <InlineWysiwyg name="markdownBody"> */}
            <MarkdownContent escapeHtml={false} content={markdownBody} />
            {/* </InlineWysiwyg> */}
            <DocsPagination prevPage={prev} nextPage={next} />
          </Wrapper>
        </DocsTextWrapper>
        <Footer light editMode={props.editMode} />
      </DocsContent>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </DocsLayout>
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
  const guideMetaRaw = await readFile(path.join(pathToGuide, 'meta.json'))
  const guideMeta = JSON.parse(guideMetaRaw)
  const markdownFile = await readMarkdownFile(
    path.join(pathToGuide, `${step}.md`)
  )

  return {
    props: {
      currentGuide: guideMeta,
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

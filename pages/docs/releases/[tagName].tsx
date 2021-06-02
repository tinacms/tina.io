import React from 'react'
import axios from 'axios'
import Error from 'next/error'
import { NextSeo } from 'next-seo'
import { CloudDisclaimer } from 'components/cloud-beta-disclaimer'
import { DocsLayout, MarkdownContent } from 'components/layout'
import Toc from 'components/toc'
import { LastEdited, DocsPagination } from 'components/ui'
import { InlineTextarea } from 'react-tinacms-inline'
import { getReleases } from 'utils/docs/getReleases'
import { openGraphImage } from 'utils/open-graph-image'
import { getJsonPreviewProps } from '../../../utils/getJsonPreviewProps'
import {
  DocGridContent,
  DocGridHeader,
  DocGridToc,
  DocsGrid,
  DocsPageTitle,
} from '../[...slug]'
import content from '*.svg'
import { slugifyTocHeading } from 'utils/docs/slugifyToc'
import getTocContent from 'utils/getTocContent'
import { useTocListener } from 'utils'

export default function ReleasePage({ release, notFound, docsNav, tocItems }) {
  if (notFound) {
    return <Error statusCode={404} />
  }

  const title = `Release Notes for ${release.tag_name}`
  const excerpt = ''
  const { contentRef, activeIds } = useTocListener()

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: title,
          description: excerpt,
          images: [openGraphImage(release.tag_name, '| TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={docsNav}>
        <DocsGrid>
          <DocGridHeader>
            <DocsPageTitle>{title}</DocsPageTitle>
          </DocGridHeader>
          <DocGridToc>
            <Toc tocItems={tocItems} activeIds={activeIds} />
          </DocGridToc>
          <DocGridContent ref={contentRef}>
            <hr />
            <MarkdownContent escapeHtml={false} content={release.body} />
            <a target="_blank" href={release.html_url}>
              View on GitHub
            </a>
            <LastEdited date={release.published_at} />
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

export const getStaticPaths = async () => {
  const allReleases = await getReleases()

  const paths = allReleases.map(release => {
    return `/docs/releases/${encodeURIComponent(release.tag_name)}`
  })

  return {
    paths,
    fallback: false,
  }
}

const MINUTES = 60 // seconds

export const getStaticProps = async ctx => {
  const allReleases = await getReleases()
  const release = allReleases.find(
    release => release.tag_name == ctx.params.tagName
  )

  const navPreviewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    false,
    {}
  )
  const docsNavData = navPreviewProps.props.file.data

  return {
    props: {
      release: release,
      notFound: !release,
      docsNav: docsNavData,
      tocItems: getTocContent(release.body, {
        slugify: slugifyTocHeading,
      }),
    },
    revalidate: 15 * MINUTES,
  }
}

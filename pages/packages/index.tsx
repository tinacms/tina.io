import DocTemplate, { DocsGrid, DocGridHeader, DocsPageTitle, DocGridToc, DocGridContent } from '../docs/[...slug]'
import { getDocProps } from '../../utils/docs/getDocProps'
import { GetStaticProps } from 'next'
import { GithubError } from 'next-tinacms-github'
import { useGithubMarkdownForm } from 'react-tinacms-github'
import React, { useState } from 'react'
import { createTocListener } from 'utils'
import { usePlugin } from 'tinacms'
import { useLastEdited } from 'utils/useLastEdited'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
import { NextSeo } from 'next-seo'
import { openGraphImage } from 'utils/open-graph-image'
import { DocsLayout, MarkdownContent } from 'components/layout'
import { InlineTextareaField } from 'react-tinacms-inline'
import Toc from 'components/toc'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { LastEdited, DocsPagination } from 'components/ui'
import { getJsonPreviewProps, readJsonFile } from 'utils/getJsonPreviewProps'
import path from 'path'


export default function PackageIndex(props) {
  const excerpt = 'Packages for TinaCMS.'

  const name = "Packages"

  const contentRef = React.useRef<HTMLDivElement>(null)
  const isBrowser = typeof window !== `undefined`
  const [activeIds, setActiveIds] = useState([])

  React.useEffect(() => {
    if (!isBrowser || !contentRef.current) {
      return
    }
    const activeTocListener = createTocListener(contentRef, setActiveIds)
    window.addEventListener('scroll', activeTocListener)

    return () => window.removeEventListener('scroll', activeTocListener)
  }, [contentRef])

  return (
    <>
      <NextSeo
        title={name}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: name,
          description: excerpt,
          images: [openGraphImage(name, ' | TinaCMS Docs')],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          <DocGridContent ref={contentRef}>
            <ul>
              {props.packages.map( p => {
                return (
                  <li><a href={p.link}>{p.name}</a></li>
                )
              }
            )}
            </ul>
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async function(props) {
  try {

    const { preview, previewData }: any = props

    const previewProps = await getJsonPreviewProps(
      'content/toc-doc.json',
      preview,
      previewData
    )

    const docsNavData = previewProps.props.file.data

    const file = await readJsonFile(
      path.resolve(process.cwd(), './content/packages.json')
    )
    const packagePages = file.packages.map( p => {
      if (p.readme) {
        return {
          name: p.name,
          link: `https://tinacms.org/packages/${p.name}`
        }
      } else {
        return {
          name: p.name,
          link: p.link
        }
      }
    })

    return {
      props: {
        packages: packagePages,
        docsNav: docsNavData
      }
    }
  } catch (e) {
    if (e instanceof GithubError) {
      return {
        props: {
          previewError: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else {
      throw e
    }
  }
}

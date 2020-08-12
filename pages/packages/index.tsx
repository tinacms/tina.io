import { DocsGrid, DocGridContent } from '../docs/[...slug]'
import { GetStaticProps } from 'next'
import { GithubError } from 'next-tinacms-github'
import React from 'react'
import { NextSeo } from 'next-seo'
import { openGraphImage } from 'utils/open-graph-image'
import { DocsLayout } from 'components/layout'
import { getJsonPreviewProps, readJsonFile } from 'utils/getJsonPreviewProps'
import path from 'path'

export default function PackageIndex(props) {
  const excerpt = 'Packages for TinaCMS.'

  const name = 'Packages'

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
          <DocGridContent ref={null}>
            <h1>TinaCMS Packages</h1>
            <hr />
            <ul>
              {props.packages.map(p => {
                return (
                  <li>
                    <a href={p.link}>{p.name}</a>
                  </li>
                )
              })}
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

    const packagePages = file.packages.map(p => ({
      name: p.name,
      link: p.readme ? `/packages/${p.name}` : p.link,
    }))

    return {
      props: {
        packages: packagePages,
        docsNav: docsNavData,
      },
    }
  } catch (e) {
    if (e instanceof GithubError) {
      return {
        props: {
          error: { ...e }, //workaround since we cant return error as JSON
        },
      }
    } else {
      throw e
    }
  }
}

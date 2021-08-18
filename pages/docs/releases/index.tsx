import { DocsLayout, MarkdownContent } from 'components/layout'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { getReleases } from 'utils/docs/getReleases'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { openGraphImage } from 'utils/open-graph-image'

export default function ReleaseIndex({ releases, docsNav }) {
  const title = 'Release Notes'
  const excerpt = 'View the details of the latest TinaCMS release'

  const [latestRelease, ...previousReleases] = releases

  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title,
          description: excerpt,
          images: [openGraphImage(title)],
        }}
      />
      <DocsLayout navItems={docsNav}>
        <DocsGrid>
          <DocGridHeader>
            <DocsPageTitle>Release Notes</DocsPageTitle>
            <hr />
          </DocGridHeader>
          <DocGridContent>
            <h2>Latest Release</h2>
            <blockquote>
              <MarkdownContent escapeHtml={true} content={latestRelease.body} />
              <Link href={latestRelease.slug}>Permalink</Link>
              <br />
              <a href={latestRelease.html_url} target="_blank">
                View on GitHub
              </a>
            </blockquote>
            <h2>Previous Releases</h2>
            <ReleaseList>
              <ul>
                {previousReleases.map(release => {
                  return (
                    <li key={release.slug}>
                      <Link href={release.slug}>
                        <a>
                          <h4>{release.name}</h4>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </ReleaseList>
          </DocGridContent>
        </DocsGrid>
      </DocsLayout>
    </>
  )
}

const MINUTES = 60 // seconds

export const getStaticProps = async (ctx: any) => {
  const allReleases = await getReleases()

  const navPreviewProps = await getJsonPreviewProps(
    'content/toc-doc.json',
    false,
    {}
  )
  const docsNavData = navPreviewProps.props.file.data

  return {
    props: {
      releases: allReleases.map(release => ({
        name: release.tag_name,
        slug: `/docs/releases/${release.tag_name}`,
        html_url: release.html_url,
        body: release.body,
        published_at: release.published_at,
      })),
      docsNav: docsNavData,
    },
    revalidate: 15 * MINUTES,
  }
}

/*
 * STYLES --------------------------------------------------------------
 */

const ReleaseList = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0 0 1rem 0;
  }

  a {
    &:hover {
      color: var(--color-orange);
    }
  }

  h4 {
    color: inherit;
  }
`

const DocsGrid = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-auto-columns: 2rem auto 2rem;
  grid-template-areas:
    '. header .'
    '. toc .'
    '. content .';
  padding-top: 2rem;
  padding-bottom: 3rem;

  @media (min-width: 830px) {
    grid-template-areas:
      '. header header .'
      '. content toc .';
    grid-auto-columns: auto 768px 23rem auto;
    grid-column-gap: 2rem;
  }

  @media (min-width: 1700px) {
    grid-auto-columns: auto 768px 24rem auto;
    grid-column-gap: 3rem;
  }
`

const DocGridHeader = styled.div`
  grid-area: header;
  width: 100%;
  justify-self: center;
  max-width: 768px;

  @media (min-width: 830px) {
    max-width: none;
  }
`

const DocGridContent = styled.div`
  grid-area: content;
  width: 100%;
  justify-self: center;
  max-width: 768px;
`

const DocsPageTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.3;
  letter-spacing: 0.1px;
  color: var(--color-orange);
  position: relative;
  font-family: var(--font-tuner);
  font-style: normal;

  @media (max-width: 1199px) {
    margin: 0 0 1.25rem 0 !important;
  }
`

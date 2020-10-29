import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { DocsLayout } from 'components/layout'
import { getDocsNav } from 'utils/docs/getDocProps'
import matter from 'gray-matter'
import { openGraphImage } from 'utils/open-graph-image'

function DocTemplate(props) {
  const frontmatter = {
    title: 'Releases',
  }
  const excerpt = 'Release notes for TinaCMS'

  return (
    <>
      <NextSeo
        title={frontmatter.title}
        titleTemplate={'%s | TinaCMS Docs'}
        description={excerpt}
        openGraph={{
          title: frontmatter.title,
          description: excerpt,
          images: [openGraphImage(frontmatter.title)],
        }}
      />
      <DocsLayout navItems={props.docsNav}>
        <DocsGrid>
          <DocGridHeader>
            <DocsPageTitle>Release Notes</DocsPageTitle>
            <hr />
          </DocGridHeader>
          <DocGridContent>
            <ReleaseList>
              <ul>
                {props.releases
                  .sort((a, b) => {
                    // @ts-ignore You CAN substract dates for sorting
                    return new Date(b.date) - new Date(a.date)
                  })
                  .map(release => {
                    return (
                      <li key={release.slug}>
                        <Link href={release.slug}>
                          <a>
                            <h4>{release.title}</h4>
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

export default DocTemplate

/*
 * DATA FETCHING ------------------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const fs = require('fs')
  const fg = require('fast-glob')
  const path = require('path')

  const contentDir = './content/docs/'
  const releaseFiles = await fg(`${contentDir}releases/*.md`)
  const releases = []

  for (const filePath of releaseFiles) {
    const slug = filePath.substring(contentDir.length, filePath.length - 3)
    const absPath = path.resolve(`${filePath}`)
    const doc = matter(fs.readFileSync(absPath, 'utf8'))

    releases.push({
      slug,
      title: doc.data.title,
      date: doc.data.date,
    })
  }

  const docsNav = await getDocsNav(preview, previewData)

  return {
    props: {
      preview: false,
      docsNav: docsNav.data,
      releases,
    },
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
      color: var(--color-primary);
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
  color: var(--color-primary);
  position: relative;
  font-family: var(--font-tuner);
  font-style: normal;

  @media (max-width: 1199px) {
    margin: 0 0 1.25rem 0 !important;
  }
`

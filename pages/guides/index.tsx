import { getGuideNavProps } from '../../utils/guide_helpers'
import { readMarkdownFile } from '../../utils/getMarkdownFile'
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  DocsLayout,
  DocsTextWrapper,
  Wrapper,
  MarkdownContent,
  Footer,
} from '../../components/layout'
import { NextSeo } from 'next-seo'
import {
  DocsNavToggle,
  DocsMobileTinaIcon,
  DocsContent,
  DocsHeaderNav,
} from '../docs/[...slug]'
import { DocsNav, Overlay, DynamicLink } from '../../components/ui'
import { CardGrid, Card } from '../../components/ui/Cards'
import RightArrowSvg from '../../public/svg/right-arrow.svg'

const GuideTemplate = props => {
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
      return props.allGuides.sort((a, b) => a.sortID > b.sortID)
    }
  }, [props.currentGuide, props.allGuides])

  const router = useRouter()
  const currentPath = router.asPath

  const guideTitle = props.currentGuide
    ? props.currentGuide.title
    : 'TinaCMS Guides'

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
            <h1>{frontmatter.title}</h1>
            <hr />
            <MarkdownContent escapeHtml={false} content={markdownBody} />
            {navData &&
              navData.map(section => (
                <GuideSection key={section.id} {...section} />
              ))}
          </Wrapper>
        </DocsTextWrapper>
        <Footer light editMode={props.editMode} />
      </DocsContent>
      <Overlay open={open} onClick={() => setOpen(false)} />
    </DocsLayout>
  )
}

interface NavSection {
  id: string
  slug: string
  title: string
  items: NavSection[]
  collapsible?: boolean
  returnLink?: {
    url: string
    label: string
  }
}

const GuideSection = (section: NavSection) => {
  const hasChildren = section.items && section.items.length > 0

  return (
    <>
      <h2>{section.title}</h2>
      {hasChildren && (
        <CardGrid>
          {(section.items || []).map(item => (
            <DynamicLink href={item.slug} passHref>
              <Card>
                <h3>{item.title}</h3>
                <RightArrowSvg />
              </Card>
            </DynamicLink>
          ))}
        </CardGrid>
      )}
    </>
  )
}

export default GuideTemplate

export const getStaticProps = async () => {
  const path = require('path')
  return {
    props: {
      slug: '/guides',
      currentGuide: null,
      markdownFile: await readMarkdownFile(
        path.resolve('./content/guides/index.md')
      ),
      allGuides: await getGuideNavProps(),
    },
  }
}

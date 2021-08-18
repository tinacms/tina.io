import React from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Overlay } from '../ui'
import { DocumentationNavigation } from 'components/DocumentationNavigation'
import { Footer } from './Footer'
import { DocsTextWrapper } from './DocsTextWrapper'
import { FeedbackForm } from 'components/forms'
import { CloudBanner } from './CloudBanner'

interface DocsLayoutProps {
  navItems: any
  guide?: false | { category: string }
  children: any
  showLayout?: boolean
}

export const DocsLayout = React.memo(
  ({
    children,
    navItems,
    guide = false,
    showLayout = true,
  }: DocsLayoutProps) => {
    const router = useRouter()
    return (
      <>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <DocsLayoutDiv>
          {showLayout && (
            <DocumentationNavigation navItems={navItems} guide={guide} />
          )}
          <DocsTextWrapper>{children}</DocsTextWrapper>
          <FeedbackForm />
          {showLayout && <Footer light />}
        </DocsLayoutDiv>
      </>
    )
  }
)

const DocsLayoutDiv = styled.div`
  @media (min-width: 1200px) {
    position: relative;
    padding: 0 0 0 16rem;

    ${Overlay} {
      display: none;
    }
  }
`

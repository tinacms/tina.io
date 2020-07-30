import React from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Overlay } from '../ui'
import { DocumentationNavigation } from 'components/DocumentationNavigation'
import { Footer } from './Footer'
import { DocsTextWrapper } from './DocsTextWrapper'

interface DocsLayoutProps {
  navItems: any
  children: any
}

export const DocsLayout = React.memo(
  ({ children, navItems }: DocsLayoutProps) => {
    const router = useRouter()
    return (
      <>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <DocsLayoutDiv>
          <DocumentationNavigation navItems={navItems} />
          <DocsTextWrapper>{children}</DocsTextWrapper>
          <Footer light />
        </DocsLayoutDiv>
      </>
    )
  }
)

const DocsLayoutDiv = styled.div`
  @media (min-width: 1000px) {
    position: relative;
    padding: 0 0 0 16rem;

    ${Overlay} {
      display: none;
    }
  }
`

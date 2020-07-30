import React from 'react'
import styled, { css } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Overlay } from '../ui'

interface DocsLayoutProps {
  isEditing?: boolean
  children: any
}

export const DocsLayout = React.memo(
  ({ isEditing, children }: DocsLayoutProps) => {
    const router = useRouter()
    return (
      <>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <DocsLayoutDiv isEditing={isEditing}>{children}</DocsLayoutDiv>
      </>
    )
  }
)

const DocsContent = styled.div`
  grid-area: content;
`

interface DocsLayoutDivProps {
  isEditing: boolean
}

const DocsLayoutDiv = styled.div<DocsLayoutDivProps>`
  @media (min-width: 1000px) {
    position: relative;
    padding: 0 0 0 16rem;

    ${Overlay} {
      display: none;
    }
  }
`

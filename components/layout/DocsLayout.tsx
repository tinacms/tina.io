import React from 'react'
import styled, { css } from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Overlay } from '../ui'

interface DocsLayoutProps {
  isEditing: boolean
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

interface DocsLayoutDivProps {
  isEditing: boolean
}

const DocsLayoutDiv = styled.div<DocsLayoutDivProps>`
  @media (min-width: 1000px) {
    position: fixed;
    left: 0;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-areas: 'nav content';
    grid-template-columns: 16rem auto;

    ${Overlay} {
      display: none;
    }

    ${p =>
      p.isEditing &&
      css`
        height: calc(100% - 62px);
      `};
  }
`

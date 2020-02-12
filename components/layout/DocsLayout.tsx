import React from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Overlay } from '../ui'

export const DocsLayout = styled(
  React.memo(({ children, ...styleProps }) => {
    const router = useRouter()
    return (
      <>
        <DefaultSeo
          openGraph={{
            url: 'https://tinacms.org' + router.asPath,
          }}
        />
        <div {...styleProps}>{children}</div>
      </>
    )
  })
)`
  @media (min-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas: 'nav content';
    grid-template-columns: 16rem auto;

    ${Overlay} {
      display: none;
    }
  }
`

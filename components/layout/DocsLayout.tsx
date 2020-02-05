import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import { GlobalStyle } from '../../components/styles/GlobalStyle'
import { DocsNav } from '../ui/DocsNav'

export const DocsLayout = styled(({ children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <GlobalStyle />
      {children}
    </div>
  )
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media (min-width: 1000px) {
    display: grid;
    grid-template-areas: 'nav content';
    grid-template-columns: 16rem auto;
  }
`

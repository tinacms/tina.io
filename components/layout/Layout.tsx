import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { GlobalStyle } from '../styles/GlobalStyle'
import { Header, Footer } from '../layout'

export const Layout = styled(({ children, darkHeader, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <GlobalStyle />
      {darkHeader ? <Header darkHeader /> : <Header />}
      {children}
      <Footer />
    </div>
  )
})`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 auto;
  min-height: 100%;
`

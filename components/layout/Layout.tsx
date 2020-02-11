import React from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Header, Footer } from '../layout'

export const Layout = styled(({ children, color, ...styleProps }) => {
  const router = useRouter()
  return (
    <div {...styleProps}>
      <DefaultSeo
        openGraph={{
          url: 'https://tinacms.org' + router.asPath,
        }}
      />
      <Header color={color} />
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

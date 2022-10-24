import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { CloudBanner } from './CloudBanner'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: any | any[]
  color?: 'white' | 'secondary' | 'seafoam'
}

export const Layout = ({ children, color, ...styleProps }: LayoutProps) => {
  const router = useRouter()

  return (
    <div {...styleProps}>
      <DefaultSeo
        openGraph={{
          url: 'https://tina.io' + router.asPath,
        }}
      />
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  )
}

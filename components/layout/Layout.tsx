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

export const Layout = ({ children, color }: LayoutProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <DefaultSeo
        openGraph={{
          url: 'https://tina.io' + router.asPath,
        }}
      />
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
    </div>
  )
}

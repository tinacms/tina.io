import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Footer } from './Footer'
import { CloudBanner } from './CloudBanner'
import { Navbar } from './Navbar'
import BlobBackground from '../../public/svg/blob-bg.svg'

interface LayoutProps {
  children: any | any[]
  color?: 'white' | 'secondary' | 'seafoam'
}

export const Layout = ({ children, color }: LayoutProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <DefaultSeo
        openGraph={{
          url: 'https://tina.io' + router.asPath,
        }}
      />
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
      <BlobBackground className="absolute top-0 left-0 -z-1 w-full h-auto min-h-screen" />
    </div>
  )
}

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
    <div className="flex flex-col min-h-screen">
      <DefaultSeo
        openGraph={{
          url: 'https://tina.io' + router.asPath,
        }}
      />
      <Navbar />
      <div className="flex flex-col flex-1">{children}</div>
      <Footer />
      <div className="absolute top-0 left-0 w-screen -z-1">
        <BlobBackground className="w-full h-auto" />
        <div className="absolute w-full h-1/2 bg-gradient-to-t from-white to-transparent bottom-0 left-0"></div>
      </div>
    </div>
  )
}

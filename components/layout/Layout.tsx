import React, { useMemo } from 'react'
import styled from 'styled-components'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { usePlugin } from 'tinacms'
import { Header, Footer } from '../layout'
import { BlogPostCreatorPlugin } from '../../tinacms/BlogPostCreator'
import { ReleaseNotesCreatorPlugin } from '../../tinacms/ReleaseNotesCreator'

interface LayoutProps {
  children: any[]
  color?: 'white' | 'secondary' | 'seafoam'
}

export const Layout = styled(
  ({ children, color, ...styleProps }: LayoutProps) => {
    const router = useRouter()

    usePlugin(BlogPostCreatorPlugin)
    usePlugin(ReleaseNotesCreatorPlugin)

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
  }
)`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 auto;
  min-height: 100%;
`

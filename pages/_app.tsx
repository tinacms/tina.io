import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, Tina } from 'tinacms'
import { GitClient } from '@tinacms/git-client'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import TagManager from 'react-gtm-module'
import { GlobalStyle } from '../components/styles/GlobalStyle'
import { OpenAuthoring } from '../components/layout/OpenAuthoring'
import { Toolbar } from '../components/cms/Toolbar'
import { BrowserStorageApi } from '../utils/plugins/BrowserStorageApi'

const MainLayout = ({ Component, pageProps }) => {
  /*
   ** TODO: If and when 'preview' state becomes accessible
   ** at the _app level, we should move the sidebar / editMode
   ** logic to be handled here
   */
  const tinaConfig = {
    apis: {
      git: new GitClient('http://localhost:3000/___tina'),
      storage:
        typeof window !== 'undefined'
          ? new BrowserStorageApi(window.localStorage)
          : {},
    },

    sidebar: {
      // editMode initially set here
      hidden: true,
      position: 'displace' as any,
    },
  }

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])

  return (
    <Tina cms={cms} {...tinaConfig.sidebar}>
      <Toolbar />
      <OpenAuthoring>
        <DefaultSeo
          title={data.seoDefaultTitle}
          titleTemplate={'%s | ' + data.title}
          description={data.description}
          openGraph={{
            type: 'website',
            locale: 'en_CA',
            url: data.siteUrl,
            site_name: data.title,
            images: [
              {
                url: 'https://tinacms.org/img/tina-twitter-share.png',
                width: 1200,
                height: 628,
                alt: `TinaCMS`,
              },
            ],
          }}
          twitter={{
            handle: data.social.twitterHandle,
            site: data.social.twitterHandle,
            cardType: 'summary_large_image',
          }}
        />
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="theme-color" content="#E6FAF8" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </OpenAuthoring>
    </Tina>
  )
}

class Site extends App {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.GTM_ID,
      })
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return <MainLayout Component={Component} pageProps={pageProps} />
  }
}

export default Site

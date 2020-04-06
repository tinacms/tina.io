import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider, ModalProvider } from 'tinacms'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import TagManager from 'react-gtm-module'
import { GlobalStyle } from '../components/styles/GlobalStyle'
import { OpenAuthoringProvider } from '../open-authoring/open-authoring/OpenAuthoringProvider'
import { Toolbar } from '../components/cms/Toolbar'
import { BrowserStorageApi } from '../utils/plugins/browser-storage-api/BrowserStorageApi'
import { Alerts } from '../components/layout/Alerts'
import { GithubApi } from '../utils/plugins/github-api/GithubApi'
import { authenticate } from '../open-authoring/github-auth/authenticate'
import { withOpenAuthoringErrorHandler } from '../open-authoring/errors/withOpenAuthoringErrorHandler'

const MainLayout = ({ Component, pageProps }) => {
  /*
   ** TODO: If and when 'preview' state becomes accessible
   ** at the _app level, we should move the sidebar / editMode
   ** logic to be handled here
   */
  const tinaConfig = {
    apis: {
      github: new GithubApi('/api/proxy-github', process.env.REPO_FULL_NAME),
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
    toolbar: {
      hidden: false,
    },
  }

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])

  const enterEditMode = () =>
    fetch(`/api/preview`).then(() => {
      window.location.href = window.location.pathname
    })

  const exitEditMode = () => {
    fetch(`/api/reset-preview`).then(() => {
      window.location.reload()
    })
  }

  return (
    <TinaProvider cms={cms}>
      <ModalProvider>
        <Alerts />
        <OpenAuthoringProvider
          authenticate={() => authenticate('/api/create-github-access-token')}
          enterEditMode={enterEditMode}
          exitEditMode={exitEditMode}
          error={pageProps.previewError}
        >
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
        </OpenAuthoringProvider>
      </ModalProvider>
    </TinaProvider>
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

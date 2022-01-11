import React, { useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import { TinaCMS, TinaProvider, ModalProvider } from 'tinacms'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import TagManager from 'react-gtm-module'
import { GlobalStyles, FontLoader } from '@tinacms/styles'
import { BrowserStorageApi } from 'utils/plugins/browser-storage-api/BrowserStorageApi'
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'
import { GlobalStyle } from 'components/styles/GlobalStyle'
import 'components/styles/fontImports.css'
import path from 'path'
import { BlogPostCreatorPlugin } from '../tinacms/BlogPostCreator'
import { NextGithubMediaStore } from '../utils/plugins/NextGithubMediaStore'

// the following line will cause all content files to be available in a serverless context
path.resolve('./content/')

const github = new GithubClient({
  proxy: '/api/proxy-github',
  authCallbackRoute: '/api/create-github-access-token',
  clientId: process.env.GITHUB_CLIENT_ID,
  baseRepoFullName: process.env.BASE_REPO_FULL_NAME,
})

const MainLayout = ({ Component, pageProps }) => {
  const tinaConfig = {
    enabled: pageProps.preview,
    toolbar: pageProps.preview,
    sidebar: pageProps.preview,
    apis: {
      github,
      storage:
        typeof window !== 'undefined'
          ? new BrowserStorageApi(window.localStorage)
          : {},
    },
    media: new NextGithubMediaStore(github),
    plugins: [BlogPostCreatorPlugin],
  }

  const cms = React.useMemo(() => new TinaCMS(tinaConfig), [])

  useEffect(() => {
    import('react-tinacms-date').then(({ DateFieldPlugin }) => {
      cms.plugins.add(DateFieldPlugin)
    })
    import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin)
    })
    import('react-tinacms-field-condition').then(
      ({ ConditionalFieldPlugin, ConditionalGroupFieldPlugin }) => {
        cms.plugins.add(ConditionalFieldPlugin)
        cms.plugins.add(ConditionalGroupFieldPlugin)
      }
    )
  }, [pageProps.preview])

  const enterEditMode = async () => {
    const token = localStorage.getItem('tinacms-github-token') || null
    const headers = new Headers()

    if (token) {
      headers.append('Authorization', 'Bearer ' + token)
    }

    const response = await fetch(`/api/preview`, { headers })
    const data = await response.json()

    if (response.status === 200) {
      window.location.reload()
    } else {
      throw new Error(data.message)
    }
  }

  const exitEditMode = () => {
    fetch(`/api/reset-preview`).then(() => {
      window.location.reload()
    })
  }

  const loadFonts = useShouldLoadFont(cms)

  return (
    <TinaProvider cms={cms} styled={false}>
      <GlobalStyles />
      {loadFonts && <FontLoader />}
      <ModalProvider>
        <TinacmsGithubProvider
          onLogin={enterEditMode}
          onLogout={exitEditMode}
          error={pageProps.error}
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
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
              }}
            />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </TinacmsGithubProvider>
      </ModalProvider>
    </TinaProvider>
  )
}

function useShouldLoadFont(cms: TinaCMS) {
  const [enabled, setEnabled] = React.useState(cms.enabled)

  React.useEffect(() => {
    if (cms.enabled) return
    return cms.events.subscribe('cms:enable', () => {
      setEnabled(true)
    })
  }, [])

  return enabled
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

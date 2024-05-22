import React, { useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'
import TagManager from 'react-gtm-module'
import { GlobalStyle } from 'components/styles/GlobalStyle'
import 'components/styles/fontImports.css'
import path from 'path'
import '../styles/tailwind.css'
import { useEditState } from 'tinacms/dist/react'
import { CloudBanner } from '../components/layout/CloudBanner'
import dynamic from 'next/dynamic'
import ChatBaseBot from '../components/ui/TinaChatBot'

// the following line will cause all content files to be available in a serverless context
path.resolve('./content/')


const MainLayout = ({ Component, pageProps }) => {

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      TagManager.initialize({
        gtmId: process.env.GTM_ID,
      });

      TagManager.initialize({
        gtmId: process.env.SSW_GTM_ID,
      });
    }
  }, []);
  
  return (
    <>
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
              alt: `Tina - The Markdown CMS`,
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
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.GTM_ID}');
          `,
        }}
      />
      <GlobalStyle />
      <AdminLink />
      <CloudBanner />
      <Component {...pageProps} />
      <ChatBaseBot />
    </>
  )
}

const AdminLink = () => {
  const { edit } = useEditState()
  const [showAdminLink, setShowAdminLink] = React.useState(false)

  useEffect(() => {
    setShowAdminLink(
      !edit &&
      JSON.parse((window.localStorage.getItem('tinacms-auth') as any) || '{}')
        ?.access_token
    )
  }, [edit])

  const handleDismiss = () => {
    setShowAdminLink(false)
  }

  return (
    <>
      {showAdminLink && (
        <div className="fixed top-4 right-4 flex items-center justify-between bg-blue-500 text-white px-3 py-1 rounded-full z-50">
          <a
            href={`/admin/index.html#/~${window.location.pathname}`}
            className="text-xs"
          >
            Edit This Page
          </a>
          <button onClick={handleDismiss} className="ml-2 text-sm">
            xx
          </button>
        </div>
      )}
    </>
  )
}

// TODO: Probably should use hooks here
class Site extends App {
  render() {
    const { Component, pageProps } = this.props
    return <MainLayout Component={Component} pageProps={pageProps} />
  }
}

export default Site

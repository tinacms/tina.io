import React from 'react'
import App from 'next/app'
import { withTina } from 'tinacms'
import { GitClient } from '@tinacms/git-client'
import { DefaultSeo } from 'next-seo'
import data from '../content/siteConfig.json'

class Site extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <DefaultSeo
          title={data.seoTitle}
          description={data.description}
          openGraph={{
            type: 'website',
            locale: 'en_CA',
            url: data.siteUrl,
            site_name: data.title,
          }}
          twitter={{
            handle: data.social.twitterHandle,
            site: data.social.twitterHandle,
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </>
    )
  }
}

export default withTina(Site, {
  cms: {
    apis: {
      git: new GitClient('http://localhost:3000/___tina'),
    },
  },
  sidebar: {
    hidden: process.env.NODE_ENV === 'production',
  },
})

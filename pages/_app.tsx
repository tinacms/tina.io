import { GlobalStyle } from 'components/styles/GlobalStyle';
import 'components/styles/fontImports.css';
import Cookies from 'js-cookie';
import { DefaultSeo } from 'next-seo';
import App from 'next/app';
import Head from 'next/head';
import path from 'path';
import React, { useEffect } from 'react';
import { useEditState } from 'tinacms/dist/react';
import { CloudBanner } from '../components/layout/CloudBanner';
import ConsentBanner from '../components/ui/ConsentBanner';
import ChatBaseBot from '../components/ui/TinaChatBot';
import data from '../content/siteConfig.json';
import '../styles/tailwind.css';

path.resolve('./content/');

const MainLayout = ({ Component, pageProps }) => {
  useEffect(() => {
    const consentGiven = Cookies.get('consentGiven');
    if (consentGiven) {
      const consentState = JSON.parse(consentGiven);
    }
    (function (h: any, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 5190939, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'pepjushhm5');
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
              url: 'https://tina.io/img/tina-og.png',
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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href={data.siteUrl + '/rss.xml'}
        />
      </Head>
      <GlobalStyle />
      <ConsentBanner />
      <AdminLink />
      <CloudBanner />
      <Component {...pageProps} />
      <ChatBaseBot />
    </>
  );
};

const AdminLink = () => {
  const { edit } = useEditState();
  const [showAdminLink, setShowAdminLink] = React.useState(false);

  useEffect(() => {
    setShowAdminLink(
      !edit &&
        JSON.parse((window.localStorage.getItem('tinacms-auth') as any) || '{}')
          ?.access_token
    );
  }, [edit]);

  const handleDismiss = () => {
    setShowAdminLink(false);
  };

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
  );
};

// TODO: Probably should use hooks here
class Site extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <MainLayout Component={Component} pageProps={pageProps} />;
  }
}

export default Site;

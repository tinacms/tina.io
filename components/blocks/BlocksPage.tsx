'use client';

import { Layout } from '../layout';
import { Blocks } from './Blocks';
import { GlobalStyles } from '../styles/BlockStyles';
import Head from 'next/head';

export const BlocksPage = ({ data, recentPosts }) => {
  return (
    <>
      {data.seo && (
        <Head>
          <title>{`${data.seo.title}${!data.seo.hasCustomSuffix ? ' | Tina' : ''}`}</title>
          <meta name="description" content={data.seo.description} />
          <meta property="og:title" content={data.seo.title} />
          <meta property="og:description" content={data.seo.description} />
        </Head>
      )}
      {/* TODO: why is there a type error here */}
      {/* @ts-ignore */}
      <Blocks blocks={data.blocks} recentPosts={recentPosts} />
      <style global jsx>
        {GlobalStyles}
      </style>
    </>
  );
};

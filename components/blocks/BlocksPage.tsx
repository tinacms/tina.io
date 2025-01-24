'use client';

import { Layout } from '../layout';
import { NextSeo } from 'next-seo';
import { GlobalStyles } from '../styles/BlockStyles';
import { Blocks } from './Blocks';

export const BlocksPage = ({ data, recentPosts }) => {
  return (
    <>
      {data.seo && (
        <NextSeo
          title={data.seo.title}
          description={data.seo.description}
          titleTemplate={data.seo.hasCustomSuffix ? '%s' : '%s | Tina'}
          openGraph={{
            title: data.seo.title,
            description: data.seo.description,
          }}
        />
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

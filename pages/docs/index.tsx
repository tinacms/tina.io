import { GetStaticProps } from 'next';
import React from 'react';
import DocTemplate, {
  getStaticPaths as slugGetStaticPaths,
  getStaticProps as slugGetStaticProps,
} from './[...slug]';

export const getStaticProps: GetStaticProps = async function (props) {
  return await slugGetStaticProps({ params: { slug: ['index'] } });
};

export default DocTemplate;

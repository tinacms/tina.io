import React from 'react';
import DocTemplate, { getStaticProps as slugGetStaticProps, getStaticPaths as slugGetStaticPaths } from './[...slug]';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async function(props) {
  return await slugGetStaticProps({ params: { slug: ['index'] } });
};


export default DocTemplate;

import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Layout } from 'components/layout'
import { NextSeo } from 'next-seo'
import { Blocks, GlobalStyles } from 'components/home'

const HomePage = (props: any) => {
  const data = props.file.data

  return (
    <>
      <NextSeo
        title={data.seo.title}
        description={data.seo.description}
        openGraph={{
          title: data.seo.title,
          description: data.seo.description,
        }}
      />
      <Layout>
        <Blocks blocks={data.blocks} />
      </Layout>
      <style global jsx>
        {GlobalStyles}
      </style>
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/home.json', preview, previewData)
}

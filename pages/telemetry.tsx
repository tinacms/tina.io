import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { NextSeo } from 'next-seo'
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from 'components/layout'

const SecurityPage = (props: any) => {
  const { data } = props.file
  return (
    <Layout>
      <NextSeo title={data.title} description={data.title} />
      <Hero>{data.title}</Hero>
      <RichTextWrapper>
        <Section>
          <Wrapper>
            <MarkdownContent content={data.body} />
          </Wrapper>
        </Section>
      </RichTextWrapper>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps(
    'content/pages/oss-telemetry.json',
    preview,
    previewData
  )
}

export default SecurityPage

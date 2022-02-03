import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { NextSeo } from 'next-seo'
import { useGithubJsonForm } from 'react-tinacms-github'
import styled from 'styled-components'
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from 'components/layout'
import { usePlugin } from 'tinacms'

const SecurityPage = (props: any) => {
  //@ts-ignore
  const [data, form] = useGithubJsonForm(props.file, SecurityPageTemplate)

  usePlugin(form)

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

const SecurityPageTemplate = {
  label: 'Security',
  defaultItem: {},
  fields: [
    {
      label: 'Page Title',
      name: 'title',
      component: 'textarea',
    },
    {
      label: 'Body Copy',
      name: 'body',
      component: 'markdown',
    },
  ],
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

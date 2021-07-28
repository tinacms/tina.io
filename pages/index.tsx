import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Layout } from 'components/layout'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineGithubForm } from '../components/layout/InlineGithubForm'
import { NextSeo } from 'next-seo'
import { InlineBlocks } from 'react-tinacms-inline'
import {
  GlobalStyles,
  HOMEPAGE_BLOCKS,
  HOMEPAGE_TEMPLATES,
} from 'components/home'

const HomePage = (props: any) => {
  //@ts-ignore
  const [formData, form] = useGithubJsonForm(props.file, HomePageTemplate)

  usePlugin(form)

  const { seo } = formData

  return (
    <InlineGithubForm form={form}>
      <NextSeo
        title={seo.title}
        description={seo.description}
        openGraph={{
          title: seo.title,
          description: seo.description,
        }}
      />
      <Layout>
        <InlineBlocks name="blocks" blocks={HOMEPAGE_BLOCKS} />
      </Layout>
      <style global jsx>
        {GlobalStyles}
      </style>
    </InlineGithubForm>
  )
}

export default HomePage

const HomePageTemplate = {
  label: 'Home Page',
  defaultItem: {},
  fields: [
    {
      label: 'Page Sections',
      name: 'blocks',
      component: 'blocks',
      templates: HOMEPAGE_TEMPLATES,
    },
    {
      label: 'SEO',
      name: 'seo',
      component: 'group',
      fields: [
        { name: 'title', label: 'Page Title', component: 'text' },
        {
          name: 'description',
          label: 'Page Description',
          component: 'textarea',
        },
      ],
    },
  ],
}

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  return getJsonPreviewProps('content/pages/home.json', preview, previewData)
}

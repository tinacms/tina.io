import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Footer } from 'components/layout'
import { usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineGithubForm } from '../components/layout/InlineGithubForm'
import { NextSeo } from 'next-seo'
import { InlineBlocks } from 'react-tinacms-inline'
import {
  BrowserBlock,
  browser_template,
  DemoBlock,
  demo_teamplate,
  FeaturesBlock,
  features_template,
  FlyingBlock,
  flying_template,
  GlobalStyles,
  HeroBlock,
  hero_template,
  NavbarBlock,
  navbar_template,
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
      <InlineBlocks name="blocks" blocks={HOMEPAGE_BLOCKS} />
      <Footer />
      <style global jsx>
        {GlobalStyles}
      </style>
    </InlineGithubForm>
  )
}

export default HomePage

const HOMEPAGE_BLOCKS = {
  navbar: {
    Component: NavbarBlock,
    template: navbar_template,
  },
  hero: {
    Component: HeroBlock,
    template: hero_template,
  },
  features: {
    Component: FeaturesBlock,
    template: features_template,
  },
  demo: {
    Component: DemoBlock,
    template: demo_teamplate,
  },
  browser: {
    Component: BrowserBlock,
    template: browser_template,
  },
  flying: {
    Component: FlyingBlock,
    template: flying_template,
  },
}

const HomePageTemplate = {
  label: 'Home Page',
  defaultItem: {},
  fields: [
    {
      label: 'Page Sections',
      name: 'blocks',
      component: 'blocks',
      templates: {
        navbar: navbar_template,
        hero: hero_template,
        features: features_template,
        demo: demo_teamplate,
        browser: browser_template,
        flying: flying_template,
      },
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

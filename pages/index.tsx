import React from 'react'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { Footer } from 'components/layout'
import Link from 'next/link'
import { BlockTemplate, useCMS, usePlugin } from 'tinacms'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineGithubForm } from '../components/layout/InlineGithubForm'
import ReactMarkdown from 'react-markdown'
import { NextSeo } from 'next-seo'
import {
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import {
  BrowserBlock,
  browser_template,
  Container,
  DemoBlock,
  demo_teamplate,
  Divider,
  FeaturesBlock,
  features_template,
  FlyingBlock,
  flying_template,
  HeroBlock,
  hero_template,
  IconRight,
  NavbarBlock,
  navbar_template,
  TinaIcon,
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
      <style global jsx>{`
        :root {
          --color-orange: #ec4815;
          --color-orange-light: #eb6337;
          --color-orange-dark: #dc4419;
          --color-yellow: #f2c94c;
          --color-green: #6fcf97;
          --color-black: #1c1b2e;
          --color-blue: #241748;
          --color-white: #ffffff;
          --color-gray: #f3f3f3;
          --color-light-gray: #fafafa;
          --color-seafoam: #e6faf8;
          --color-seafoam-dark: #b4f4e0;

          --color-emphasis: var(--color-orange);
          --color-card-background: var(--color-light-gray);

          --spacer-size: 4.5rem;
          --section-padding: calc(var(--spacer-size) * 2);
          --container-padding: 1.5rem;
        }

        html {
          min-width: 400px;
        }

        .section {
          padding: var(--section-padding) 0;
        }

        .headingHuge {
          font-family: var(--font-tuner);
          font-weight: bold;
          font-size: 2.75rem;
          line-height: 1.4;
          margin-bottom: 2rem;

          :global(em),
          :global(strong) {
            font-weight: inherit;
            color: var(--color-emphasis);
            font-style: inherit;

            @media (min-width: 600px) {
              white-space: nowrap;
            }
          }
        }

        .headingLarge {
          font-family: var(--font-tuner);
          margin-bottom: 1rem;
          font-size: 2.25rem;
          font-weight: bold;
        }

        .headingMedium {
          font-size: 1.675rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .textHuge {
          display: block;
          width: 100%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          font-size: 1.375rem;

          &:not(:last-child) {
            margin-bottom: 2rem;
          }
        }

        .textLarge {
          font-size: 1.125rem;
          opacity: 0.7;

          &:not(:last-child) {
            margin-bottom: 1.25rem;
          }
        }

        .spacer {
          display: block;
          width: 100%;
          height: var(--spacer-size);
        }

        .spacerBig {
          height: calc(var(--spacer-size) * 1.5);
        }

        .dottedBorder {
          border-top: none;
          border-right: none;
          border-left: none;
          border-image: initial;
          border-bottom: 4px dotted var(--color-orange);
          width: 6rem;
          max-width: 100%;
          display: block;
          height: 0px;
          margin: 1.5rem 0px;
        }

        .orange {
          background: linear-gradient(
            to top right,
            var(--color-orange),
            var(--color-orange-light)
          );
          color: var(--color-white);
        }

        .black {
          background: var(--color-black);
          color: var(--color-white);
        }

        .blue {
          background: var(--color-blue);
          background: linear-gradient(
            to bottom,
            var(--color-blue) 30%,
            var(--color-black) 100%
          );
          color: var(--color-white);
          --color-emphasis: var(--color-orange-light);
        }

        .lightGray {
          background: var(--color-light-gray);
          color: var(--color-black);
          --color-card-background: var(--color-white);
        }

        .white {
          background: var(--color-white);
          color: var(--color-black);
        }
      `}</style>
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

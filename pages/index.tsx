import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { inlineJsonForm } from 'next-tinacms-json'

import {
  Layout,
  Hero,
  HeroTitle,
  Wrapper,
  Section,
  RichTextWrapper,
} from '../components/layout'
import { Button, Video, ArrowList } from '../components/ui'
import { NextSeo, DefaultSeo } from 'next-seo'

const HomePage = props => {
  const data = props.jsonFile
  return (
    <Layout pathname="/">
      <DefaultSeo titleTemplate={data.title + ' | %s'} />
      <Hero overlap narrow>
        {data.headline}
      </Hero>
      <Video src={data.hero_video} />

      <Section>
        <Wrapper>
          <RichTextWrapper>
            <CtaLayout>
              <h2>
                <em>{data.description}</em>
              </h2>
              <CtaBar>
                <Link href={'/docs/getting-started/introduction/'} passHref>
                  <Button as="a" color="primary">
                    Get Started
                  </Button>
                </Link>
              </CtaBar>
            </CtaLayout>
            <InfoLayout>
              {data.three_points.map(point => (
                <div key={point.main.slice(0, 8)}>
                  <h3>
                    <em>{point.main}</em>
                  </h3>
                  <p>{point.supporting}</p>
                </div>
              ))}
            </InfoLayout>
          </RichTextWrapper>
        </Wrapper>
      </Section>

      <Section color="seafoam">
        <Wrapper>
          <SetupLayout>
            <RichTextWrapper>
              <h2 className="h1">{data.setup.headline}</h2>
              <hr />
              <ArrowList>
                {data.setup.steps.map(item => (
                  <li key={item.step.slice(0, 8)}>{item.step}</li>
                ))}
              </ArrowList>
              <Link href={'/docs/getting-started/introduction/'} passHref>
                <Button as="a" color="primary">
                  Get Started
                </Button>
              </Link>
            </RichTextWrapper>
            <CodeWrapper>
              <CodeExample
                dangerouslySetInnerHTML={{
                  __html: `yarn add <b>gatsby-plugin-tinacms</b>

module.exports = {
  <span>// ...</span>
  plugins: [
    '<b>gatsby-plugin-tinacms</b>',
    <span>// ...</span>
  ],
};

export <b>WithTina</b>( <b>Component</b> );
                  `,
                }}
              ></CodeExample>
            </CodeWrapper>
          </SetupLayout>
        </Wrapper>
      </Section>
    </Layout>
  )
}

const formOptions = {
  label: 'Home Page',
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      description: 'Enter the main headline here',
      component: 'text',
    },
    {
      label: 'Description',
      name: 'description',
      description: 'Enter supporting main description',
      component: 'textarea',
    },
    {
      label: 'Selling Points',
      name: 'three_points',
      description: 'Edit the points here',
      component: 'group-list',
      itemProps: item => ({
        key: item.id,
        label: `${item.main.slice(0, 15)}...`,
      }),
      fields: [
        {
          label: 'Main',
          name: 'main',
          component: 'textarea',
        },
        {
          label: 'Supporting',
          name: 'supporting',
          component: 'textarea',
        },
      ],
    },
    {
      label: 'Setup Headline',
      name: 'setup.headline',
      description: 'Enter the "setup" headline here',
      component: 'textarea',
    },
    {
      label: 'Setup Steps',
      name: 'setup.steps',
      description: 'Edit the steps here',
      component: 'group-list',
      itemProps: item => ({
        key: item.id,
        label: `${item.step.slice(0, 15)}...`,
      }),
      fields: [
        {
          label: 'Step',
          name: 'step',
          component: 'textarea',
        },
      ],
    },
  ],
}

const EditableHomePage = inlineJsonForm(HomePage, formOptions)
export default EditableHomePage

export async function unstable_getStaticProps() {
  const homeData = await import('../content/pages/home.json')

  return {
    props: {
      jsonFile: {
        fileRelativePath: 'content/pages/home.json',
        data: homeData.default,
      },
    },
  }
}

/*
 ** STYLES -------------------------------------------------------
 */

const CodeWrapper = styled.div`
  border-radius: 50px;
  background-color: #d4f0ee;
  display: block;
  overflow: auto;
`

const CodeExample = styled.code`
  display: block;
  padding: 3rem;
  color: #241748;
  font-size: 20px;
  line-height: 1.2;
  font-family: Monaco, 'Courier New', Courier, monospace;
  white-space: pre;
  filter: drop-shadow(rgba(104, 120, 125, 0.2) 0px 7px 8px);
  align-self: flex-start;
  width: 100%;
  display: block;

  b {
    color: var(--color-primary);
  }

  span {
    opacity: 0.3;
  }
`

const InfoLayout = styled.div`
  display: grid;
  grid-gap: 2rem;

  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const SetupLayout = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media (min-width: 800px) {
    align-items: start;
    grid-gap: 4rem;
    grid-template-columns: repeat(2, 1fr);
  }
`

const CtaLayout = styled.div`
  max-width: 35rem;
  text-align: center;
  margin: 0 auto;
  padding: 0 0 3rem 0;

  @media (min-width: 800px) {
    padding: 0 0 5rem 0;
  }
`

const CtaBar = styled.div`
  margin: 2rem auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  iframe {
    margin-left: 1rem;
  }
  @media (min-width: 1030px) {
    iframe {
      display: none;
    }
  }
`

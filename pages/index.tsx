import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { inlineJsonForm } from 'next-tinacms-json'

import {
  Layout,
  Hero,
  HeroTitle,
  ArrowList,
  Wrapper,
  Section,
  RichTextWrapper,
} from '../components/layout'
import { Button, Video } from '../components/ui'

const HomePage = props => {
  const data = props.jsonFile
  return (
    <Layout pathname="/">
      <Head>
        <title>TinaCMS | Build real-time editing into your site.</title>
        <meta
          name="description"
          content="Tina is an open-source site editing toolkit for React-based frameworks — Gatsby & Next.js."
        />
      </Head>
      <Hero overlap narrow>
        {data.headline}
      </Hero>
      <Video src={'v1571425758/tina-hero-demo-v2'} />
      <RichTextWrapper>
        <Section>
          <Wrapper>
            <CtaLayout>
              <h2>
                <em>{data.description}</em>
              </h2>
              <CtaBar>
                <Link href={'/docs/getting-started/introduction/'} passHref>
                  <Button as="a" primary>
                    Get Started
                  </Button>
                </Link>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=tinacms&repo=tinacms&type=star&count=true&size=large"
                  frameBorder="0"
                  scrolling="0"
                  width="145px"
                  height="30px"
                ></iframe>
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
          </Wrapper>
        </Section>

        <Section seafoam>
          <Wrapper>
            <SetupLayout>
              <div>
                <h2 className="h1">{data.headline}</h2>
                <hr />
                <ArrowList>
                  {data.setup.steps.map(item => (
                    <li key={item.step.slice(0, 8)}>{item.step}</li>
                  ))}
                </ArrowList>
                <Link href={'/docs/getting-started/introduction/'} passHref>
                  <Button as="a" primary>
                    Get Started
                  </Button>
                </Link>
              </div>
              <div>
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
              </div>
            </SetupLayout>
          </Wrapper>
        </Section>
      </RichTextWrapper>
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

EditableHomePage.getInitialProps = async function() {
  const homeData = await import('../content/pages/home.json')

  return {
    jsonFile: {
      fileRelativePath: 'content/pages/home.json',
      data: homeData.default,
    },
  }
}

/*
 ** STYLES -------------------------------------------------------
 */

const CodeExample = styled.code`
  border-radius: 50px;
  background-color: #d4f0ee;
  color: #241748;
  padding: 50px;
  font-size: 20px;
  line-height: 1.2;
  font-family: Monaco, 'Courier New', Courier, monospace;
  white-space: pre;
  filter: drop-shadow(rgba(104, 120, 125, 0.2) 0px 7px 8px);
  align-self: flex-start;
  width: 100%;
  display: block;
  margin-top: 0.5rem;

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

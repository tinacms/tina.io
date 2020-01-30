import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { inlineJsonForm } from 'next-tinacms-json'

import Layout from '../components/layout/Layout'
import Hero from '../components/layout/Hero'
import ArrowList from '../components/layout/ArrowList'
import Wrapper from '../components/layout/Wrapper'
import Section from '../components/layout/Section'
import Button from '../components/ui/Button'

const heroVideo = 'v1571425758/tina-hero-demo-v2'

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
      <Hero overlap>
        <HomepageTitle>{data.headline}</HomepageTitle>
      </Hero>
      <HeroVideo>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={`https://res.cloudinary.com/forestry-demo/video/upload/so_0/${heroVideo}.jpg`}
        >
          <source
            src={`https://res.cloudinary.com/forestry-demo/video/upload/q_100,h_584/${heroVideo}.webm`}
            type="video/webm"
          />
          <source
            src={`https://res.cloudinary.com/forestry-demo/video/upload/q_80,h_584/${heroVideo}.mp4`}
            type="video/mp4"
          />
        </video>
      </HeroVideo>
      <Section>
        <Wrapper>
          <CtaLayout>
            <h2>
              <em>{data.description}</em>
            </h2>
            <Link href={'/docs/getting-started/introduction/'} passHref>
              <Button as="a" primary>
                Get Started
              </Button>
            </Link>
          </CtaLayout>
          <InfoLayout>
            {data.three_points.map(point => (
              <div key={point.main.slice(0, 8)}>
                <h3>{point.main}</h3>
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

const HomepageTitle = styled(({ children, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <h2 className="h1">{children}</h2>
    </div>
  )
})`
  h2 {
    max-width: 9em;
    text-align: center;
    margin: 0 auto;
  }
`

const HeroVideo = styled.div`
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
  img,
  video {
    margin: 0 auto;
    filter: drop-shadow(rgba(104, 120, 125, 0.3) 0px 14px 16px);
    border-radius: 10px;
    max-width: 934px;
    width: 100%;
  }
`

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
    opacity: 0.5;
  }
`

const InfoLayout = styled.div`
  display: grid;
  grid-gap: 2rem;

  h3,
  h4 {
    color: var(--color-primary);
  }

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

  ${Button} {
    margin: 2rem auto 0 auto;
  }

  @media (min-width: 800px) {
    padding: 0 0 5rem 0;
  }
`

import React, { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import { inlineJsonForm } from 'next-tinacms-json'
import { DynamicLink } from '../components/ui/DynamicLink'
import { useCMS, useLocalForm, usePlugins } from 'tinacms'
import { PRPlugin } from '../open-authoring/prPlugin'
import { b64DecodeUnicode } from '../open-authoring/utils/base64'

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
import { saveContent, getContent } from '../open-authoring/github/api'
import { useEditContext } from '../utils/editContext'
import { setCachedFormData, getCachedFormData } from '../utils/formCache'

const HomePage = (props: any) => {
  const cms = useCMS()

  useEffect(() => {
    setCachedFormData(props.fileRelativePath, {
      sha: props.sha,
    })
  }, [])

  const editContext = useEditContext()
  editContext.setIsEditMode(props.editMode)

  const [formData, form] = useLocalForm({
    id: props.fileRelativePath, // needs to be unique
    label: 'Home Page',
    initialValues: {
      fileRelativePath: props.fileRelativePath,
      data: props.data,
      sha: props.sha,
    },
    fields: [
      {
        label: 'Headline',
        name: 'data.headline',
        description: 'Enter the main headline here',
        component: 'text',
      },
      {
        label: 'Description',
        name: 'data.description',
        description: 'Enter supporting main description',
        component: 'textarea',
      },
      {
        label: 'Selling Points',
        name: 'data.three_points',
        description: 'Edit the points here',
        component: 'group-list',
        //@ts-ignore
        itemProps: item => ({
          key: item.id,
          label: `${item.main.slice(0, 15)}...`,
        }),
        defaultItem: () => ({
          main: 'New Point',
          supporting: '',
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
        name: 'data.setup.headline',
        description: 'Enter the "setup" headline here',
        component: 'textarea',
      },
      {
        label: 'Setup Steps',
        name: 'data.setup.steps',
        description: 'Edit the steps here',
        component: 'group-list',
        //@ts-ignore
        itemProps: item => ({
          key: item.id,
          label: `${item.step.slice(0, 15)}...`,
        }),
        defaultItem: () => ({
          step: 'New Step',
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
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      saveContent(
        props.forkFullName,
        props.branch,
        props.fileRelativePath,
        props.accessToken,
        getCachedFormData(props.fileRelativePath).sha,
        JSON.stringify(formData.data),
        'Update from TinaCMS'
      ).then(response => {
        setCachedFormData(props.fileRelativePath, {
          sha: response.data.content.sha,
        })
      })
    },
  })

  function usePRPlugin() {
    const brancher = useMemo(() => {
      return new PRPlugin(
        props.baseRepoFullName,
        props.forkFullName,
        props.headBranch,
        props.accessToken
      )
    }, [
      props.baseRepoFullName,
      props.forkFullName,
      props.headBranch,
      props.accessToken,
    ])

    usePlugins(brancher)
  }
  if (props.editMode) {
    usePRPlugin()
  }

  const homeData = formData.data

  return (
    <Layout pathname="/">
      <DefaultSeo titleTemplate={homeData.title + ' | %s'} />
      <Hero overlap narrow>
        {homeData.headline}
      </Hero>
      <Video src={homeData.hero_video} />

      <Section>
        <Wrapper>
          <RichTextWrapper>
            <CtaLayout>
              <h2>
                <em>{homeData.description}</em>
              </h2>
              <CtaBar>
                <DynamicLink
                  href={'/docs/getting-started/introduction/'}
                  passHref
                >
                  <Button as="a" color="primary">
                    Get Started
                  </Button>
                </DynamicLink>
              </CtaBar>
            </CtaLayout>
            <InfoLayout>
              {homeData.three_points.map(point => (
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
              <h2 className="h1">{homeData.setup.headline}</h2>
              <hr />
              <ArrowList>
                {homeData.setup.steps.map(item => (
                  <li key={item.step.slice(0, 8)}>{item.step}</li>
                ))}
              </ArrowList>
              <DynamicLink
                href={'/docs/getting-started/introduction/'}
                passHref
              >
                <Button as="a" color="primary">
                  Get Started
                </Button>
              </DynamicLink>
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

export default HomePage

export async function unstable_getStaticProps({ preview, previewData }) {
  const filePath = 'content/pages/home.json'

  if (preview) {
    const { fork_full_name, github_access_token } = previewData

    const headBranch = 'master'
    const response = await getContent(
      fork_full_name,
      headBranch,
      filePath,
      github_access_token
    )

    return {
      props: {
        editMode: true,
        forkFullName: fork_full_name,
        headBranch,
        accessToken: github_access_token,
        baseRepoFullName: process.env.REPO_FULL_NAME,
        sha: response.data.sha,
        fileRelativePath: filePath,
        data: JSON.parse(b64DecodeUnicode(response.data.content)),
      },
    }
  } else {
    const data = await import(`../content/pages/home.json`)

    return {
      props: {
        data: data.default,
      },
    }
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
  font-size: 1.125rem;
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

  @media (min-width: 1200px) {
    font-size: 1.3725rem;
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

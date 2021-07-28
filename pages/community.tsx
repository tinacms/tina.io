import React from 'react'
import styled from 'styled-components'
import { DynamicLink } from 'components/ui/DynamicLink'
import { GetStaticProps } from 'next'

import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from 'components/layout'
import { InlineTextarea } from 'react-tinacms-inline'
import { Button, ButtonGroup } from 'components/ui'
import { EmailForm } from 'components/forms'
import { NextSeo } from 'next-seo'
import { InlineGithubForm } from 'components/layout/InlineGithubForm'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineWysiwyg } from 'components/inline-wysiwyg'
import { usePlugin, useCMS } from 'tinacms'

function CommunityPage({ file: community, metadata, preview }) {
  const cms = useCMS()

  // Registers Tina Form
  const [data, form] = useGithubJsonForm(community, {
    label: 'Community Page',
    fields: [
      {
        label: 'Headline',
        name: 'headline',
        description: 'Enter the main headline here',
        component: 'text',
      },
      {
        label: 'Community Image',
        name: 'img',
        component: 'group',
        fields: [
          {
            label: 'Image',
            name: 'src',
            component: 'image',
            parse: media => {
              if (!media) return ''
              return media.id
            },
            uploadDir: () => '/img/',
          },
          { label: 'Alt Text', name: 'alt', component: 'text' },
        ],
      },
      {
        label: 'Secondary Headline',
        name: 'supporting_headline',
        description: 'Enter the secondary headline here',
        component: 'textarea',
      },
      {
        label: 'Secondary Body Copy',
        name: 'supporting_body',
        description: 'Enter the body copy here',
        component: 'markdown',
      },
      {
        label: 'Newsletter Header',
        name: 'newsletter_header',
        component: 'text',
      },
      {
        label: 'Newsletter CTA',
        name: 'newsletter_cta',
        component: 'text',
      },
    ],
  })

  usePlugin(form)

  return (
    <InlineGithubForm form={form}>
      <Layout>
        <NextSeo
          title={data.title}
          description={data.description}
          openGraph={{
            title: data.title,
            description: data.description,
          }}
        />
        <Hero>
          <InlineTextarea name="headline" />
        </Hero>
        <RichTextWrapper>
          <Section>
            <Wrapper>
              <InfoLayout>
                <InfoContent>
                  <InfoText>
                    <h2>
                      <InlineTextarea name="supporting_headline" />
                    </h2>
                    <hr />
                    <InlineWysiwyg name="supporting_body">
                      <MarkdownContent content={data.supporting_body} />
                    </InlineWysiwyg>
                  </InfoText>
                  <ButtonGroup>
                    <DynamicLink href={'https://discord.gg/QC724mKx'} passHref>
                      <Button as="a">Discord</Button>
                    </DynamicLink>
                    <DynamicLink
                      href={'https://community.tinacms.org'}
                      passHref
                    >
                      <Button as="a">Forum</Button>
                    </DynamicLink>
                    <DynamicLink
                      href={'https://github.com/tinacms/tinacms'}
                      passHref
                    >
                      <Button as="a">GitHub</Button>
                    </DynamicLink>
                    <DynamicLink href={'https://twitter.com/tina_cms'} passHref>
                      <Button as="a">Twitter</Button>
                    </DynamicLink>
                  </ButtonGroup>
                </InfoContent>
                <InfoImage src={data.img.src} alt={data.img.alt} />
              </InfoLayout>
            </Wrapper>
          </Section>
          <FormSection color="seafoam">
            <Wrapper>
              <h2>
                <InlineTextarea name="newsletter_header" />
              </h2>
              <p>
                <InlineTextarea name="newsletter_cta" />
              </p>
              <EmailForm />
            </Wrapper>
          </FormSection>
        </RichTextWrapper>
      </Layout>
    </InlineGithubForm>
  )
}

export default CommunityPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const { default: metadata } = await import('../content/siteConfig.json')

  const previewProps = await getJsonPreviewProps(
    'content/pages/community.json',
    preview,
    previewData
  )
  return { props: { ...previewProps.props, metadata } }
}
/*
 ** STYLES ------------------------------------------------------
 */

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto;
  grid-gap: 4rem;
  margin-bottom: 2rem;
  grid-template-areas: 'image' 'content';

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 800px) {
    grid-template-columns: 3fr 2fr;
    grid-template-rows: auto;
    align-items: stretch;
    grid-template-areas: 'content image';
  }
`

const InfoContent = styled.div`
  grid-area: content;
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

const InfoText = styled.div`
  margin-bottom: 1.5rem;
  h1,
  h2,
  h3,
  .h1,
  .h2,
  .h3 {
    text-align: center;
  }
  hr {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 800px) {
    h1,
    h2,
    h3,
    .h1,
    .h2,
    .h3 {
      text-align: left;
    }
    hr {
      margin-left: 0;
      margin-right: 0;
    }
    flex: 1 0 auto;
  }
`

const InfoImage = styled(({ src, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <img src={src} alt="" />
    </div>
  )
})`
  display: block;
  grid-area: image;
  max-width: 65vw;
  margin: 0 auto;
  border-radius: 2rem;
  overflow: hidden;

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const FormSection = styled(Section)`
  @media (min-width: 800px) {
    text-align: center;

    form {
      margin: 0 auto;
    }
  }

  p {
    margin-bottom: 2rem;
    font-family: var(--font-tuner);
  }
`

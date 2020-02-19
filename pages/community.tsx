import React from 'react'
import styled from 'styled-components'
import { useLocalJsonForm } from 'next-tinacms-json'
import { DynamicLink } from '../components/ui/DynamicLink'
import { InlineForm } from 'react-tinacms-inline'

import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from '../components/layout'
import {
  EditToggle,
  DiscardButton,
  InlineWysiwyg,
  InlineTextareaField,
  InlineTextField,
  InlineControls,
} from '../components/ui/inline'
import { Button, ButtonGroup } from '../components/ui'
import { EmailForm } from '../components/forms'
import TwitterIconSvg from '../public/svg/twitter-icon.svg'
import GithubIconSvg from '../public/svg/github-icon.svg'
import SlackIconSvg from '../public/svg/slack-icon.svg'
import ForumIconSvg from '../public/svg/forum-icon.svg'
import { NextSeo } from 'next-seo'

export default function CommunityPage({ jsonFile, metadata }) {
  const formOptions = {
    fields: [
      {
        label: 'Headline',
        name: 'headline',
        description: 'Enter the main headline here',
        component: 'text',
      },
      /*
       ** TODO: make this gif an image field
       */
      {
        label: 'Gif',
        name: 'gif.src',
        description: 'Enter path to gif from static',
        component: 'text',
      },
      {
        label: 'Gif Alt',
        name: 'gif.alt',
        description: 'Enter Gif alt tag here',
        component: 'text',
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
        label: 'Newsletter CTA',
        name: 'newsletter_cta',
        component: 'text',
      },
    ],
  }
  const [data, form] = useLocalJsonForm(jsonFile, formOptions)

  return (
    <InlineForm form={form}>
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
          <h2 className="h1">{data.headline}</h2>
        </Hero>
        <SocialBar>
          <SocialItem>
            <a
              href={`${metadata.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIconSvg />
              <h5>Tweet us</h5>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a
              href={`${metadata.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIconSvg />
              <h5>Fork us</h5>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a
              href={`${metadata.social.slack}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SlackIconSvg />
              <h5>Slack us</h5>
            </a>
            <span className="dotted-line" />
          </SocialItem>
          <SocialItem>
            <a
              href={`${metadata.social.forum}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ForumIconSvg />
              <h5>Ask us</h5>
            </a>
          </SocialItem>
        </SocialBar>
        <RichTextWrapper>
          <Section>
            {/*
             *** Inline controls shouldn't render
             *** until we're ready for Inline release
             */}
            {/*
              <InlineControls>
              <EditToggle />
              <DiscardButton />
              </InlineControls>
            */}
            <Wrapper>
              <InfoLayout>
                <InfoContent>
                  <InfoText>
                    <h2>
                      <InlineTextareaField name="supporting_headline" />
                    </h2>
                    <hr />
                    <InlineWysiwyg name="supporting_body">
                      <MarkdownContent content={data.supporting_body} />
                    </InlineWysiwyg>
                  </InfoText>
                  <ButtonGroup>
                    <DynamicLink
                      href={'/docs/contributing/guidelines'}
                      passHref
                    >
                      <Button as="a">Contribute</Button>
                    </DynamicLink>
                    <DynamicLink href={metadata.roadmapUrl} passHref>
                      <Button as="a">View Roadmap</Button>
                    </DynamicLink>
                  </ButtonGroup>
                </InfoContent>
                <InfoImage src="/img/rico-replacement.jpg" />
              </InfoLayout>
            </Wrapper>
          </Section>
          <FormSection color="seafoam">
            <Wrapper>
              <h2>
                Newsletter{' '}
                <span role="img" aria-label="two finger peace sign">
                  ✌️
                </span>
              </h2>
              <p>
                <InlineTextField name="newsletter_cta" />
              </p>
              <EmailForm />
            </Wrapper>
          </FormSection>
        </RichTextWrapper>
      </Layout>
    </InlineForm>
  )
}

export async function unstable_getStaticProps() {
  const siteMetadata = await import('../content/siteConfig.json')
  const communityData = await import('../content/pages/community.json')
  return {
    props: {
      metadata: siteMetadata,
      jsonFile: {
        fileRelativePath: `content/pages/community.json`,
        data: communityData.default,
      },
    },
  }
}

/*
 ** STYLES ------------------------------------------------------
 */

const SocialBar = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-gap: 1.5rem;
  justify-content: center;
  margin: 3em auto 1rem auto;
  @media (min-width: 800px) {
    grid-template-rows: unset;
    grid-template-columns: repeat(4, auto);
    margin: 4rem auto;
    width: 700px;
  }
  @media (min-width: 1200px) {
    grid-column-gap: 2rem;
    margin: 6rem auto;
  }
`

const SocialItem = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  fill: var(--color-primary);

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: var(--color-primary);
    font-family: var(--font-tuner);
    font-weight: regular;
    font-style: normal;
  }
  a:hover,
  a:focus {
    outline: none;
    text-decoration: none;
    color: var(--color-primary);
    svg {
      transform: scale3d(1.1, 1.1, 1.1);
      transition: transform 250ms ease-out;
    }
  }
  a:focus {
    text-decoration: underline;
  }
  svg {
    width: 4rem;
    margin-bottom: 1rem;
    transform: scale3d(1, 1, 1);
    transition: transform 180ms ease-in;
  }
  h5 {
    margin-bottom: 1rem;
    text-transform: uppercase;
    text-decoration: none;
  }
  span.dotted-line {
    display: block;
    height: 30px;
    border-left: 2px dotted var(--color-primary);
  }
  @media (min-width: 800px) {
    flex-direction: row;
    width: unset;
    align-items: flex-end;
    h5 {
      margin: 0;
    }
    span.dotted-line {
      height: 1px;
      width: 57px;
      border-left: unset;
      border-top: 3px dotted var(--color-primary);
      padding-bottom: 8px;
      margin-left: 20px;
    }
  }
  @media (min-width: 1200px) {
    span.dotted-line {
      margin-left: 32px;
    }
  }
`

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: auto;
  grid-gap: 2rem;
  margin-bottom: 2rem;
  grid-template-areas: 'image' 'content';

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
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

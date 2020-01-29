import React from 'react'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import Head from 'next/head'

import Layout from '../components/layout/Layout'
import Button from '../components/ui/Button'
import { EmailForm } from '../components/forms'
import Hero from '../components/layout/Hero'
import Wrapper from '../components/layout/Wrapper'

import TwitterIconSvg from '../public/svg/twitter-icon.svg'
import GithubIconSvg from '../public/svg/github-icon.svg'
import SlackIconSvg from '../public/svg/slack-icon.svg'
import ForumIconSvg from '../public/svg/forum-icon.svg'

function CommunityPage(props) {
  console.log(props)
  const data = props.jsonFile.data
  const metadata = props.siteMetadata
  return (
    <Layout>
      <Head>
        <meta property="og:title" content="TinaCMS - Community" />
        <meta name="twitter:title" content="TinaCMS - Community" />
      </Head>
      <Hero>
        <h1>{data.headline}</h1>
      </Hero>
      <Wrapper>
        {/* TODO: Replace this section with social bar component? */}
        <SocialSection>
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
        </SocialSection>
        <InfoSection>
          <figure>
            {/* <img src={data.gif[0].src} alt={data.gif[0].gif_alt} /> */}
          </figure>
          <span id="info-wrap">
            <h5>{data.supporting_headline}</h5>
            <ReactMarkdown>{data.supporting_body}</ReactMarkdown>
            <span id="buttons">
              <Link href={'/docs/contributing/guidelines'} passHref>
                <Button as="a">Contribute</Button>
              </Link>
              <Link href={metadata.roadmapUrl} passHref>
                <Button as="a">View Roadmap</Button>
              </Link>
            </span>
          </span>
        </InfoSection>
      </Wrapper>
      <NewsletterSection>
        <h2>
          Newsletter{' '}
          <span role="img" aria-label="two finger peace sign">
            ✌️
          </span>
        </h2>
        <p>We move quick. Stay up to date.</p>
        <EmailForm />
      </NewsletterSection>
    </Layout>
  )
}

const CommunityTemplateOptions = {
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      description: 'Enter the main headline here',
      component: 'textarea',
    },
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
      component: 'textarea',
    },
  ],
}

// export default remarkForm(CommunityTemplate, CommunityTemplateOptions)
export default CommunityPage

CommunityPage.getInitialProps = async function() {
  const siteMetadata = await import('../content/siteConfig.json')
  const communityData = await import('../content/community.json')
  return {
    siteMetadata,
    jsonFile: {
      fileRelativePath: `data/info.md`,
      data: communityData,
    },
  }
}

const SocialSection = styled('section')`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-row-gap: 22px;
  justify-content: center;
  margin: 145px 0 65px 0;
  @media (min-width: 800px) {
    margin-top: 260px;
    grid-template-rows: unset;
    grid-template-columns: repeat(4, auto);
    grid-column-gap: 20px;
    width: 700px;
    margin: 260px auto 165px auto;
  }
  @media (min-width: 1200px) {
    grid-column-gap: 32px;
  }
`

const SocialItem = styled('div')`
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  fill: var(--color-primary);

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      transform: scale3d(1, 1, 1);
      transition: transform 180ms ease-in;
    }
  }
  a:hover,
  a:focus {
    outline: none;
    text-decoration: none;
    svg {
      transform: scale3d(1.1, 1.1, 1.1);
      transition: transform 250ms ease-out;
    }
  }
  a:focus {
    text-decoration: underline;
  }
  svg {
    width: 66px;
    margin-bottom: 15px;
  }
  h5 {
    text-transform: uppercase;
    margin-bottom: 18px;
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
      margin-bottom: 0;
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

const InfoSection = styled('section')`
  text-align: center;
  figure {
    display: flex;
    flex-direction: column;
    grid-area: gif;
    width: 80%;
    margin: 0 auto;
    border-radius: 10%;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: auto;
      min-height: 100%;
    }
  }
  span#info-wrap {
    grid-area: info;
  }
  span#buttons > a:first-of-type {
    display: none;
  }
  span#buttons {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 800px) {
    text-align: left;
    max-width: 1150px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'info gif';
    grid-column-gap: 1rem;
    figure {
      flex-direction: row;
    }
    span#info-wrap {
      width: 90%;
      margin: auto;
    }
    span#buttons {
      justify-content: flex-start;
    }
    h2 {
      width: unset;
    }
  }
  @media (min-width: 1200px) {
    margin-bottom: 165px;
    span#info-wrap {
      width: 85%;
      span#buttons {
        display: flex;
      }
    }
    span#buttons > a:first-of-type {
      display: flex;
      margin-right: 20px;
    }
  }
`

const NewsletterSection = styled('section')`
  background-color: var(--color-seafoam);
  form {
    display: flex;
    flex-direction: column-reverse;
    padding: 24px 0 0 0;
    h3 {
      display: none;
    }
    input {
      filter: inset 3px 1px 5px rgba(0, 0, 0, 0.15);
      margin-top: 0;
      margin-bottom: 1rem;
    }
  }
  @media (min-width: 800px) {
    text-align: center;
    form {
      display: grid;
      grid-template-columns: minMax(70%, 1fr);
      grid-column-gap: 40px;
      grid-template-rows: auto;
      grid-row-gap: 38px;
      grid-template-areas:
        'cta cta'
        'input btn';
      max-width: 620px;
      margin: 0 auto;
      padding: 18px 0 24px 0;
      h3 {
        grid-area: cta;
        display: block;
      }
      input {
        grid-area: input;
        margin: 0;
      }
      button {
        grid-area: btn;
      }
    }
  }
`

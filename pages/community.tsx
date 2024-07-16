import React from 'react'
import styled from 'styled-components'
import { GetStaticProps } from 'next'
import { FaDiscord, FaTwitter, FaGithub } from 'react-icons/fa'
import TinaIconSvg from '../public/svg/tina-icon.svg'
import {
  Layout,
  Hero,
  Wrapper,
  Section,
  RichTextWrapper,
  MarkdownContent,
} from 'components/layout'
import { Button, ButtonGroup, LinkButton } from 'components/ui'
import { EmailForm } from 'components/forms'
import { NextSeo } from 'next-seo'
import { getJsonPreviewProps } from 'utils/getJsonPreviewProps'
import Image from 'next/image'

function CommunityPage(props) {
  const data = props.file.data

  return (
    <Layout>
      <NextSeo
        title={data.title}
        description={data.description}
        openGraph={{
          title: data.title,
          description: data.description,
        }}
      />
      <Hero>{data.headline}</Hero>
      <RichTextWrapper>
        <Section>
          <Wrapper>
            <InfoLayout>
              <InfoContent>
                <InfoText>
                  {data.supporting_headline && (
                    <h2 className="!mb-0">{data.supporting_headline}</h2>
                  )}
                  <hr />
                  <MarkdownContent content={data.supporting_body} />
                </InfoText>
                <ButtonGroup>
                  <LinkButton
                    color="white"
                    link={'https://github.com/tinacms/tinacms/discussions'}
                  >
                    <TinaIconSvg
                      // @ts-ignore
                      style={{
                        fill: '#EC4815',
                        height: '1.675rem',
                        width: 'auto',
                        margin: '0 0.675rem 0 0.125rem',
                      }}
                    />{' '}
                    Discussion
                  </LinkButton>
                  <LinkButton
                    link={'https://discord.com/invite/zumN63Ybpf'}
                    color="white"
                  >
                    <FaDiscord
                      style={{
                        color: '#5865f2',
                        height: '1.5rem',
                        width: 'auto',
                        margin: '0 0.675rem 0 0.125rem',
                      }}
                    />{' '}
                    Discord
                  </LinkButton>
                  <LinkButton
                    link={'https://github.com/tinacms/tinacms'}
                    color="white"
                  >
                    <FaGithub
                      style={{
                        color: '#24292e',
                        height: '1.5rem',
                        width: 'auto',
                        margin: '0 0.675rem 0 0.125rem',
                      }}
                    />{' '}
                    GitHub
                  </LinkButton>
                  <LinkButton
                    link={'https://twitter.com/tinacms'}
                    color="white"
                  >
                    <FaTwitter
                      style={{
                        color: '#1DA1F2',
                        height: '1.5rem',
                        width: 'auto',
                        margin: '0 0.675rem 0 0.125rem',
                      }}
                    />{' '}
                    Twitter
                  </LinkButton>
                </ButtonGroup>
              </InfoContent>
              <InfoImage src={data.img.src} alt={data.img.alt} />
            </InfoLayout>
          </Wrapper>
        </Section>
        <Section color="seafoam">
          <Wrapper align="center">
            {data.newsletter_header && (
              <h2 className="font-tuner">{data.newsletter_header}</h2>
            )}
            {data.newsletter_cta && (
              <p className="!mb-7 !-mt-1">{data.newsletter_cta}</p>
            )}
            <div className="w-full flex justify-center">
              <EmailForm />
            </div>
          </Wrapper>
        </Section>
      </RichTextWrapper>
    </Layout>
  )
}

export default CommunityPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function ({
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

const InfoImage = styled(({ src, alt, ...styleProps }) => {
  return (
    <div {...styleProps}>
      <Image src={src} alt={alt} height={600} width={600} />
    </div>
  )
})`
  display: block;
  grid-area: image;
  max-width: 65vw;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 0 1px rgba(236, 72, 21, 0.03),
    0 6px 24px rgba(0, 37, 91, 0.05), 0 2px 4px rgba(0, 37, 91, 0.03);

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

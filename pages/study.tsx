import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import {
  Layout,
  Wrapper,
  RichTextWrapper,
  Hero,
  MarkdownContent,
  Section,
} from '../components/layout'
import { DynamicLink, ButtonGroup } from '../components/ui'
import { InlineGithubForm } from '../components/layout/InlineGithubForm'
import { Button } from '../components/ui'
import { useGithubJsonForm } from 'react-tinacms-github'
import { InlineTextareaField } from 'react-tinacms-inline'
import { InlineWysiwyg } from 'react-tinacms-editor'
import { GetStaticProps } from 'next'
import { getJsonPreviewProps } from '../utils/getJsonPreviewProps'

function StudySignupPage({ file: study, metadata, preview }) {
  const [data, form] = useGithubJsonForm(study, formOptions)

  return (
    <InlineGithubForm form={form}>
      <StudyLayout>
        <NextSeo
          title={data.meta.title}
          description={data.meta.description}
          openGraph={{
            title: data.meta.title,
            description: data.meta.description,
          }}
        />
        <Hero mini="true"></Hero>
        <StudyRichTextWrapper>
          <StudySection>
            <Wrapper>
              <InfoLayout>
                <InfoContent>
                  <InfoText>
                    <h2>
                      <InlineTextareaField name="headline" />
                    </h2>
                    <hr />
                    <InlineWysiwyg name="body">
                      <MarkdownContent content={data.body} />
                    </InlineWysiwyg>
                  </InfoText>
                  <ButtonGroup>
                    <DynamicLink href={data.button.link} passHref>
                      <Button as="a">{data.button.text}</Button>
                    </DynamicLink>
                  </ButtonGroup>
                </InfoContent>
                <InfoImage src="/img/dx-study.jpg" />
              </InfoLayout>
            </Wrapper>
          </StudySection>
        </StudyRichTextWrapper>
      </StudyLayout>
    </InlineGithubForm>
  )
}

export default StudySignupPage

/*
 ** DATA FETCHING -----------------------------------------------
 */

export const getStaticProps: GetStaticProps = async function({
  preview,
  previewData,
}) {
  const { default: metadata } = await import('../content/siteConfig.json')

  const previewProps = await getJsonPreviewProps(
    'content/pages/study.json',
    preview,
    previewData
  )
  return { props: { ...previewProps.props, metadata } }
}

/**
 *  TINA FORM CONFIG --------------------------------------------
 */
const formOptions = {
  label: 'Study Sign Up',
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      component: 'textarea',
    },
    {
      label: 'Body',
      name: 'body',
      component: 'markdown',
    },
    {
      label: 'Button',
      name: 'button',
      component: 'group',
      fields: [
        {
          label: 'Text',
          name: 'text',
          component: 'text',
        },
        {
          label: 'Link',
          name: 'link',
          component: 'text',
        },
      ],
    },
    {
      label: 'Meta',
      name: 'meta',
      component: 'group',
      fields: [
        {
          label: 'Title',
          name: 'title',
          component: 'text',
        },
        {
          label: 'Description',
          name: 'description',
          component: 'text',
        },
      ],
    },
  ],
}
/*
 ** STYLES ------------------------------------------------------
 */

const InfoLayout = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  grid-template-areas: 'image' 'content';

  @media (min-width: 1200px) {
    margin-bottom: 4rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    align-items: center;
    grid-template-areas: 'content image';
  }
`

const InfoContent = styled.div`
  grid-area: content;
`

const InfoText = styled.div`
  margin-bottom: 1.5rem;
  flex: 1 1 auto;

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
  max-width: 640px;
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

const StudyLayout = styled(Layout)`
  min-height: 100vh;
  color: white;
`

const StudyRichTextWrapper = styled(RichTextWrapper)`
  @media (min-width: 1200px) {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
  }
`

const StudySection = styled.section`
  flex: 1 0 auto;
  padding: 8rem 0 2rem 0;
  display: flex;
  flex-direction: column;

  ${Wrapper} {
    display: flex;
    flex: 1 0 auto;
  }
`

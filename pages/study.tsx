import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { Layout, Wrapper, RichTextWrapper, Hero } from '../components/layout'
import { OpenAuthoringSiteForm } from '../components/layout/OpenAuthoringSiteForm'
import { useGithubJsonForm } from 'react-tinacms-github'

function StudySignupPage(props) {
  const title = 'Page Title'
  const description = 'Page Description'

  return (
    <StudyLayout preview={props.preview}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
        }}
      />
      <Hero mini></Hero>
      <StudySection>
        <Wrapper>
          <StudyRichTextWrapper>
            <StudyGrid>
              <StudyContent>
                <h2>
                  We are looking for passionate Gatsby and Next.js developers to
                  give feedback for TinaCMS.
                </h2>
                <p>
                  You will be exploring a few guides and starters the team has
                  created, and perhaps even build yourself a website while you
                  are at it! . If you are interested in exploring the awesome
                  world of editable websites with Tina and give us valuable
                  feedback.
                </p>
                <p>
                  We will be compensating each user with a 75 dollar Visa
                  giftcard.
                </p>
              </StudyContent>
              <StudyFormWrapper>
                <p>Here be form</p>
              </StudyFormWrapper>
            </StudyGrid>
          </StudyRichTextWrapper>
        </Wrapper>
      </StudySection>
    </StudyLayout>
  )
}

export default StudySignupPage

const StudyRichTextWrapper = styled(RichTextWrapper)`
  width: 100%;
`

const StudyLayout = styled(Layout)`
  min-height: 100vh;
  color: white;
`

const StudySection = styled.section`
  flex: 1 0 auto;
  padding: 8rem 0 5rem 0;
  display: flex;
  flex-direction: column;

  ${Wrapper} {
    display: flex;
    flex: 1 0 auto;
  }
`

const StudyGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  min-height: 100%;
  width: 100%;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: stretch;
    grid-gap: 4rem;
  }
`

const StudyFormWrapper = styled.div`
  padding: 2rem;
  background-color: var(--color-seafoam);
  border-radius: 3rem;

  @media (min-width: 800px) {
    padding: 2rem 5rem;
  }
`

const StudyContent = styled.div`
  li {
    color: white;
    max-width: 30rem;
  }

  /* h2 {
    color: var(--color-seafoam-dark) !important;
  }

  hr {
    border-color: var(--color-seafoam-dark) !important;
  } */
`

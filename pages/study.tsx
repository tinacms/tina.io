import React from 'react'
import styled from 'styled-components'
import { NextSeo } from 'next-seo'
import { Layout, Wrapper, RichTextWrapper } from '../components/layout'
import { OpenAuthoringSiteForm } from '../components/layout/OpenAuthoringSiteForm'
import { useGithubJsonForm } from 'react-tinacms-github'

function StudySignupPage(props) {
  const title = 'Page Title'
  const description = 'Page Description'

  return (
    <StudyLayout preview={props.preview} color={'secondary'}>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
        }}
      />
      <StudySection>
        <Wrapper>
          <StudyRichTextWrapper>
            <StudyGrid>
              <StudyContent>
                <h2>Here be copy</h2>
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
  background-color: var(--color-secondary-dark);
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
  background-color: var(--color-secondary);
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

  h2 {
    color: var(--color-seafoam-dark) !important;
  }

  hr {
    border-color: var(--color-seafoam-dark) !important;
  }
`

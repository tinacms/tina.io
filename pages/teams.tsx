import React from 'react'
import styled from 'styled-components'
import { inlineJsonForm } from 'next-tinacms-json'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

import { Layout, Wrapper, Section, RichTextWrapper } from '../components/layout'
import { ArrowList } from '../components/ui'
import { TeamsForm } from '../components/forms'
import { getJsonFormProps } from '../utils/getJsonFormProps'
import { useCMS, useLocalForm } from 'tinacms'
import { saveContent } from '../open-authoring/github/api'

function TeamsPage(props) {
  const cms = useCMS()

  const [formData, form] = useLocalForm({
    id: props.fileRelativePath, // needs to be unique
    label: 'Teams',
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
        component: 'textarea',
      },
      {
        label: 'Supporting Points',
        name: 'data.supporting_points',
        description: 'Edit the points here',
        component: 'group-list',
        //@ts-ignore
        itemProps: item => ({
          key: item.id,
          label: `${item.point.slice(0, 25)}...`,
        }),
        fields: [
          {
            label: 'Point',
            name: 'data.point',
            component: 'textarea',
          },
        ],
      },
    ],
    // save & commit the file when the "save" button is pressed
    onSubmit(formData, form) {
      if (process.env.USE_CONTENT_API) {
        saveContent(
          props.forkFullName,
          props.branch,
          props.fileRelativePath,
          props.access_token,
          props.sha,
          JSON.stringify(formData.data),
          'Update from TinaCMS'
        ).then(response => {
          window.location.reload()
        }) //hack so sha updates
      } else {
        // create commit?
        alert('saves on localhost not supported')
      }
    },
  })

  const teamsData = formData.data

  return (
    <TeamsLayout page="teams" color={'secondary'}>
      <NextSeo
        title={teamsData.title}
        description={teamsData.description}
        openGraph={{
          title: teamsData.title,
          description: teamsData.description,
        }}
      />
      <TeamsSection>
        <Wrapper>
          <RichTextWrapper>
            <TeamsGrid>
              <TeamsContent>
                <h2>{teamsData.headline}</h2>
                <hr />
                <ArrowList>
                  {teamsData.supporting_points.map(item => (
                    <li key={item.point.trim()}>{item.point}</li>
                  ))}
                </ArrowList>
              </TeamsContent>
              <TeamsFormWrapper>
                <TeamsForm hubspotFormID={process.env.HUBSPOT_TEAMS_FORM_ID} />
              </TeamsFormWrapper>
            </TeamsGrid>
          </RichTextWrapper>
        </Wrapper>
      </TeamsSection>
    </TeamsLayout>
  )
}

const TeamsLayout = styled(Layout)`
  min-height: 100%;
  background-color: var(--color-secondary-dark);
  color: white;
`

const TeamsSection = styled.section`
  flex: 1 0 auto;
  padding: 8rem 0 5rem 0;
  display: flex;
  flex-direction: column;

  ${Wrapper} {
    display: flex;
    flex: 1 0 auto;
  }
`

const TeamsGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  min-height: 100%;

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    grid-gap: 4rem;
  }
`

const TeamsFormWrapper = styled.div`
  padding: 2rem;
  background-color: var(--color-secondary);
  border-radius: 3rem;

  @media (min-width: 800px) {
    padding: 2rem 5rem;
  }
`

const TeamsContent = styled.div`
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

export default TeamsPage

export async function unstable_getServerProps(ctx) {
  const props = await getJsonFormProps(ctx, 'content/pages/teams.json')
  return { props }
}

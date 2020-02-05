import React from 'react'
import styled from 'styled-components'
import { inlineJsonForm } from 'next-tinacms-json'
import Head from 'next/head'

import { Layout, Wrapper, Section, RichTextWrapper } from '../components/layout'
import { ArrowList } from '../components/ui'
import { TeamsForm } from '../components/forms'

function TeamsPage(props) {
  const data = props.jsonFile
  return (
    <TeamsLayout page="teams" color={'secondary'}>
      <TeamsSection>
        <Wrapper>
          <RichTextWrapper>
            <TeamsGrid>
              <TeamsContent>
                <h2>{data.headline}</h2>
                <hr />
                <ArrowList>
                  {data.supporting_points.map(item => (
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

const TeamsPageOptions = {
  fields: [
    {
      label: 'Headline',
      name: 'headline',
      description: 'Enter the main headline here',
      component: 'textarea',
    },
    {
      label: 'Supporting Points',
      name: 'supporting_points',
      description: 'Edit the points here',
      component: 'group-list',
      itemProps: item => ({
        key: item.id,
        label: `${item.point.slice(0, 25)}...`,
      }),
      fields: [
        {
          label: 'Point',
          name: 'point',
          component: 'textarea',
        },
      ],
    },
  ],
}

const EditableTeamsPage = inlineJsonForm(TeamsPage, TeamsPageOptions)

export default EditableTeamsPage

EditableTeamsPage.getInitialProps = async function() {
  const teamsData = await import('../content/pages/teams.json')
  return {
    jsonFile: {
      fileRelativePath: `content/pages/teams.json`,
      data: teamsData.default,
    },
  }
}

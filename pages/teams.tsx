import React from 'react'
import styled from 'styled-components'
import { inlineJsonForm } from 'next-tinacms-json'

import Layout from '../components/layout/Layout'
import Wrapper from '../components/layout/Wrapper'
import Section from '../components/layout/Section'
import { TeamsForm } from '../components/forms'
import ArrowList from '../components/layout/ArrowList'
import Head from 'next/head'

function TeamsPage(props) {
  const data = props.jsonFile
  return (
    <TeamsLayout page="teams" darkHeader>
      <Head>
        <meta property="og:title" content="TinaCMS - Teams" />
        <meta name="twitter:title" content="TinaCMS - Teams" />
      </Head>
      <TeamsSection>
        <Wrapper>
          <h2>{data.headline}</h2>
          <hr />
          <ArrowList>
            {data.supporting_points.map(item => (
              <li key={item.point.trim()}>{item.point}</li>
            ))}
          </ArrowList>
          <TeamsForm hubspotFormID={process.env.GATSBY_HUBSPOT_FORM_ID} />
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
const TeamsSection = styled(Section)`
  flex: 1 0 auto;
  padding: 5rem 0 3rem 0;

  li {
    color: white;
  }

  h1,
  h2,
  h3 {
    color: var(--color-seafoam-dark);
  }

  hr {
    border-color: var(--color-seafoam-dark);
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

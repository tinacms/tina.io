import React from 'react'
import styled from 'styled-components'
import { BlocksControls } from '../components/ui/inline'
import { BlockTemplate } from 'tinacms'
import { NextSeo } from 'next-seo'

import { Layout, Wrapper, RichTextWrapper } from '../components/layout'
import { ArrowList } from '../components/ui'
import { TeamsForm } from '../components/forms'
import { InlineTextareaField, BlockTextArea } from '../components/ui/inline'
import getJsonData from '../utils/github/getJsonData'
import { getGithubDataFromPreviewProps } from '../utils/github/sourceProviderConnection'
import OpenAuthoringSiteForm from '../components/layout/OpenAuthoringSiteForm'
import { InlineBlocks } from 'react-tinacms-inline'
import { useLocalGithubJsonForm } from '../utils/github/useLocalGithubJsonForm'
import ContentNotFoundError from '../utils/github/ContentNotFoundError'
import OpenAuthoringError from '../open-authoring/OpenAuthoringError'

const formOptions = {
  label: 'Teams',
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
      defaultItem: () => ({
        point: 'New Point',
        _template: 'point',
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

export default function TeamsPage(props) {
  // Adds Tina Form
  const [data, form] = useLocalGithubJsonForm(
    props.teams,
    formOptions,
    props.sourceProviderConnection,
    props.editMode
  )

  return (
    <OpenAuthoringSiteForm
      form={form}
      path={props.teams.fileRelativePath}
      editMode={props.editMode}
      error={props.previewError}
    >
      <TeamsLayout
        sourceProviderConnection={props.sourceProviderConnection}
        editMode={props.editMode}
        color={'secondary'}
      >
        <NextSeo
          title={data.title}
          description={data.description}
          openGraph={{
            title: data.title,
            description: data.description,
          }}
        />
        <TeamsSection>
          <Wrapper>
            <RichTextWrapper>
              <TeamsGrid>
                <TeamsContent>
                  <h2>
                    <InlineTextareaField name="headline" />
                  </h2>
                  <hr />
                  <ArrowList>
                    <InlineBlocks
                      name="supporting_points"
                      blocks={TEAMS_POINTS_BLOCKS}
                    />
                  </ArrowList>
                </TeamsContent>
                <TeamsFormWrapper>
                  <TeamsForm
                    hubspotFormID={process.env.HUBSPOT_TEAMS_FORM_ID}
                  />
                </TeamsFormWrapper>
              </TeamsGrid>
            </RichTextWrapper>
          </Wrapper>
        </TeamsSection>
      </TeamsLayout>
    </OpenAuthoringSiteForm>
  )
}

/*
 ** DATA FETCHING --------------------------------------------------
 */

export async function getStaticProps({ preview, previewData }) {
  const {
    sourceProviderConnection,
    accessToken,
  } = getGithubDataFromPreviewProps(previewData)

  let previewError: OpenAuthoringError
  let teamsData = {}
  try {
    teamsData = await getJsonData(
      'content/pages/teams.json',
      sourceProviderConnection,
      accessToken
    )
  } catch (e) {
    if (e instanceof OpenAuthoringError) {
      previewError = e
    } else {
      throw e
    }
  }

  return {
    props: {
      teams: teamsData,
      previewError: previewError,
      sourceProviderConnection,
      editMode: !!preview,
    },
  }
}

/*
 ** TINA FORM CONFIG -------------------------------------------------
 */

/*
 ** BLOCKS CONFIG ------------------------------------------------------
 */

function SupportingPoint({ data, index }) {
  return (
    <BlocksControls index={index}>
      <li key={`supporting-point-${index}`}>
        <BlockTextArea name="point" />
      </li>
    </BlocksControls>
  )
}

const point_template: BlockTemplate = {
  type: 'point',
  label: 'Teams Point',
  defaultItem: { point: 'Something dope about TinaTeams 🤙' },
  key: undefined,
  fields: [],
}

const TEAMS_POINTS_BLOCKS = {
  point: {
    Component: SupportingPoint,
    template: point_template,
  },
}

/*
 ** STYLES --------------------------------------------------------------
 */

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
